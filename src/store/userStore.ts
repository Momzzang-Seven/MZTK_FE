import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface UserInfo {
    userId: number;
    email: string;
    nickname: string;
    profileImage: string;
    role: string;
    walletAddress: string;
}

interface UserState {
    user: UserInfo | null;
    isAuthenticated: boolean;
    accessToken: string | null;

    // Level & Attendance System
    level: number;
    xp: number;
    maxXp: number;
    attendanceStreak: number; // 0 ~ 7
    lastAttendanceDate: string | null; // YYYY-MM-DD
    lastExerciseDate: string | null;

    // Async Analysis & Snackbar State
    snackbar: {
        isOpen: boolean;
        message: string;
    };
    analysisStatus: 'idle' | 'analyzing' | 'completed';
    analysisTargetTime: number | null; // Timestamp for when analysis should 'complete' // YYYY-MM-DD

    setUser: (user: UserInfo) => void;
    setAccessToken: (token: string) => void;
    clearUser: () => void;

    // Actions
    addXp: (amount: number) => void;
    checkAttendance: () => { success: boolean; message: string; rewardedXp: number };
    completeExercise: () => { success: boolean; message: string; rewardedXp: number };

    // Async Analysis Actions
    startAnalysis: () => void;
    checkAnalysisCompletion: () => void;
    closeSnackbar: () => void;
    levelUp: () => boolean;
}

export const useUserStore = create<UserState>()(
    persist(
        (set, get) => ({
            user: null,
            isAuthenticated: false,
            accessToken: null,

            // Initial Limit
            level: 1,
            xp: 0,
            maxXp: 100, // Fixed for now, can be dynamic (e.g. level * 100)
            attendanceStreak: 0,
            lastAttendanceDate: null,
            lastExerciseDate: null,
            snackbar: { isOpen: false, message: "" },
            analysisStatus: 'idle',
            analysisTargetTime: null,

            setUser: (user) => set({ user, isAuthenticated: true }),
            setAccessToken: (token) => set({ accessToken: token }),
            clearUser: () =>
                set({ user: null, isAuthenticated: false, accessToken: null, level: 1, xp: 0, attendanceStreak: 0, lastAttendanceDate: null, lastExerciseDate: null }),

            addXp: (amount) => set((state) => ({ xp: state.xp + amount })),

            checkAttendance: () => {
                const { lastAttendanceDate, attendanceStreak } = get();
                const today = new Date().toISOString().split("T")[0];

                if (lastAttendanceDate === today) {
                    return { success: false, message: "오늘의 출석을 이미 완료했습니다.", rewardedXp: 0 };
                }

                // Check if yesterday was attended to maintain streak
                const yesterday = new Date();
                yesterday.setDate(yesterday.getDate() - 1);
                const yesterdayStr = yesterday.toISOString().split("T")[0];

                let newStreak = attendanceStreak;

                if (lastAttendanceDate === yesterdayStr) {
                    newStreak += 1;
                } else {
                    newStreak = 1; // Reset if streak broken
                }

                let reward = 10; // Daily reward
                let message = "출석 완료! +10XP";

                // 7-day Streak Bonus
                if (newStreak >= 7) {
                    reward += 300; // Bonus
                    message = "7일 연속 출석 달성! +300XP";
                    newStreak = 0; // Reset streak as per plan
                }

                set({ lastAttendanceDate: today, attendanceStreak: newStreak, xp: get().xp + reward });
                return { success: true, message, rewardedXp: reward };
            },

            completeExercise: () => {
                const { lastExerciseDate } = get();
                const today = new Date().toISOString().split("T")[0];

                if (lastExerciseDate === today) {
                    return { success: false, message: "오늘의 운동을 이미 인증했습니다.", rewardedXp: 0 };
                }

                // Instead of immediate reward, we just start analysis flow UI side
                // Actual reward happens in checkAnalysisCompletion
                return { success: true, message: "분석 시작", rewardedXp: 0 };
            },

            startAnalysis: () => {
                const targetTime = Date.now() + 5000; // 5 seconds from now
                set({ analysisStatus: 'analyzing', analysisTargetTime: targetTime });
            },

            checkAnalysisCompletion: () => {
                const { analysisStatus, analysisTargetTime } = get();
                if (analysisStatus === 'analyzing' && analysisTargetTime && Date.now() >= analysisTargetTime) {
                    // Analysis Complete!
                    const today = new Date().toISOString().split("T")[0];
                    const reward = 100; // 100 XP Reward

                    set({
                        analysisStatus: 'idle',
                        analysisTargetTime: null,
                        lastExerciseDate: today,
                        xp: get().xp + reward,
                        snackbar: {
                            isOpen: true,
                            message: `운동 인증 성공! +${reward} 포인트 지급`
                        }
                    });
                }
            },

            closeSnackbar: () => {
                set((state) => ({ snackbar: { ...state.snackbar, isOpen: false } }));
            },

            levelUp: () => {
                const { xp, maxXp, level } = get();
                if (xp >= maxXp) {
                    const overflowXp = xp - maxXp; // Carry over XP
                    set({
                        level: level + 1,
                        xp: overflowXp,
                        maxXp: (level + 1) * 100 // Example: Increase requirement
                    });
                    return true;
                }
                return false;
            }
        }),
        {
            name: "user-storage",
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
                accessToken: state.accessToken,
                level: state.level,
                xp: state.xp,
                attendanceStreak: state.attendanceStreak,
                lastAttendanceDate: state.lastAttendanceDate,
                lastExerciseDate: state.lastExerciseDate,
                // Do not persist snackbar or running analysis across reloads purely (optional choice)
                // but let's persist analysis to survive reload
                analysisStatus: state.analysisStatus,
                analysisTargetTime: state.analysisTargetTime
            }),
        }
    )
);
