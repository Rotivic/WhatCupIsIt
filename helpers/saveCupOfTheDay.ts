// helpers/saveCupOfTheDay.ts
import { dbPromise } from "@/db/database";

export async function saveCupOfTheDay(cupId: number): Promise<void> {
  const db = await dbPromise;
  const today = new Date().toISOString().split("T")[0];

  await db.runAsync(
    `INSERT INTO cup_usage_history (cup_id, date) VALUES (?, ?)`,
    [cupId, today]
  );
}
