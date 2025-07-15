import { CupUsageHistory } from "@/types/Cups";
import { create } from "zustand";

interface CupHistoryStore {
  history: CupUsageHistory[];
  setHistory: (history: CupUsageHistory[]) => void;

  selectedHistoryId: number | null;
  setSelectedHistoryId: (id: number | null) => void;

  showHistoryModal: boolean;
  setShowHistoryModal: (state: boolean) => void;

  showRouletteModal: boolean;
  setShowRouletteModal: (state: boolean) => void;

  isAdding: boolean;
  setIsAdding: (state: boolean) => void;

  hasSpun: boolean;
  setHasSpun: (value: boolean) => void;
}

export const useCupHistoryStore = create<CupHistoryStore>((set) => ({
  history: [],
  setHistory: (history) => set({ history }),

  selectedHistoryId: null,
  setSelectedHistoryId: (id) => set({ selectedHistoryId: id }),

  showHistoryModal: false,
  setShowHistoryModal: (state) => set({ showHistoryModal: state }),

  showRouletteModal: false,
  setShowRouletteModal: (state) => set({ showRouletteModal: state }),

  isAdding: false,
  setIsAdding: (state) => set({ isAdding: state }),

  hasSpun: false,
  setHasSpun: (value) => set({ hasSpun: value }),
}));
