import { create } from "zustand";

interface Category {
  id: number;
  name: string;
  is_seasonal: number;
  start_date: string | null;
  end_date: string | null;
}

interface CategoryStore {
  selectedCategory: Category | null;
  setSelectedCategory: (category: Category | null) => void;
}

export const useCategoryStore = create<CategoryStore>((set) => ({
  selectedCategory: null,
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));
