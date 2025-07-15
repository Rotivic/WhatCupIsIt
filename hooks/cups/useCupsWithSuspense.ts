// hooks/useCupsWithSuspense.ts
import { getAllCups } from "@/db/database";
import { Cup } from "@/types/Cups";
import { useState } from "react";

let cupsCache: Cup[] | null = null;

export function useCupsWithSuspense(): Cup[] {
  const [cups, setCups] = useState<Cup[] | null>(cupsCache);
  if (cups === null || cups?.length <= 0) {
    throw getAllCups().then((data) => {
      cupsCache = data; // opcional: cachear
      setCups(data);
    });
  }

  return cups;
}
