import { create } from "zustand";

interface AuthModalState {
  unauthorized: boolean;
  setUnauthorized: (value: boolean) => void;
}

export const useAuthModalStore = create<AuthModalState>((set) => ({
  unauthorized: false,
  setUnauthorized: (value) => set({ unauthorized: value }),
}));
