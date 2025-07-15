import { getAllCups, getUsageByMonth, logCupUsage } from "@/db/database";
import { Cup } from "@/types/Cups";
import { getTodayCupIfExists } from "./getTodayCupIfExists";

export async function getNextCupForToday(): Promise<Cup> {
  const existing = await getTodayCupIfExists();
  if (existing) return existing;

  const allCups = await getAllCups();
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth() + 1;

  const used = await getUsageByMonth(currentYear, currentMonth);
  const usedCupIds = used.map((u) => u.cup_id);

  const unused = allCups.filter((cup) => !usedCupIds.includes(cup.id));
  const pool = unused.length > 0 ? unused : allCups;
  const selected = pool[Math.floor(Math.random() * pool.length)];

  await logCupUsage(selected.id, now.toISOString());

  return selected;
}
