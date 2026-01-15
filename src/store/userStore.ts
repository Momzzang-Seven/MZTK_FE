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
    lastExerciseDate: string | null; // YYYY-MM-DD

    setUser: (user: UserInfo) => void;
    setAccessToken: (token: string) => void;
    clearUser: () => void;

    // Actions
    addXp: (amount: number) => void;
    checkAttendance: () => { success: boolean; message: string; rewardedXp: number };
    completeExercise: () => { success: boolean; message: string; rewardedXp: number };
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

            setUser: (user) => set({ user, isAuthenticated: true }),
            setAccessToken: (token) => set({ accessToken: token }),
            clearUser: () =>
                set({ user: null, isAuthenticated: false, accessToken: null, level: 1, xp: 0, attendanceStreak: 0, lastAttendanceDate: null, lastExerciseDate: null }),

            addXp: (amount) => set((state) => ({ xp: state.xp + amount })),

            checkAttendance: () => {
                const { lastAttendanceDate, attendanceStreak, addXp } = get();
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
                const { lastExerciseDate, addXp } = get();
                const today = new Date().toISOString().split("T")[0];

                if (lastExerciseDate === today) {
                    return { success: false, message: "오늘의 운동을 이미 인증했습니다.", rewardedXp: 0 };
                }

                const reward = 100;
                set({ lastExerciseDate: today, xp: get().xp + reward });
                return { success: true, message: "운동 인증 완료! +100XP", rewardedXp: reward };
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
                lastExerciseDate: state.lastExerciseDate
            }),
        }
    )
);
