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
    setUser: (user: UserInfo) => void;
    setAccessToken: (token: string) => void;
    clearUser: () => void;
}

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            accessToken: null,
            setUser: (user) => set({ user, isAuthenticated: true }),
            setAccessToken: (token) => set({ accessToken: token }),
            clearUser: () =>
                set({ user: null, isAuthenticated: false, accessToken: null }),
        }),
        {
            name: "user-storage",
            partialize: (state) => ({
                user: state.user,
                isAuthenticated: state.isAuthenticated,
            }), // accessToken is NOT persisted
        }
    )
);
