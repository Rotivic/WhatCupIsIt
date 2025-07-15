// types.ts

export interface Cup {
  id: number;
  name: string;
  imageUri: string;
  category_id: number | null;
  is_favorite: number;
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
  is_seasonal: number; // 0 o 1
  start_date: string | null;
  end_date: string | null;
}

export interface CupUsageHistory {
  id: number;
  cup_id: number;
  date: string; // YYYY-MM-DD
}

export interface CountRow {
  count: number;
}

export interface CupUsageHistoryWithCup {
  id: number;
  cup_id: number;
  date: string;
  cupName: string;
  cupImageUri: string | null;
}
