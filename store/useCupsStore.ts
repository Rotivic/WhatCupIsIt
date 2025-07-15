// src/store/useCupsStore.ts
import { Cup } from "@/types/Cups";
import { create } from "zustand";

interface CupStore {
  selectedCup: Cup | null;
  setSelectedCup: (cup: Cup | null) => void;
  // Puedes añadir más: cups[], history[], favoritos, etc.
}

export const useCupsStore = create<CupStore>((set) => ({
  selectedCup: null,
  setSelectedCup: (cup) => set({ selectedCup: cup }),
}));
