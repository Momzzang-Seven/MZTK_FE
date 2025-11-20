import { create } from "zustand";

type CoorType = { lat: number; lng: number } | null;

interface LocationState {
  coor: CoorType;
  setCoor: (coords: CoorType) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  coor: null,
  setCoor: (coords) => set({ coor: coords }),
}));
