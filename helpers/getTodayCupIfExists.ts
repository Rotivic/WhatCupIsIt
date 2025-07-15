import { dbPromise } from "@/db/database";
import { Cup } from "@/types/Cups";

export async function getTodayCupIfExists(): Promise<Cup | null> {
  const db = await dbPromise;
  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  const result = await db.getFirstAsync<any>(
    `
    SELECT c.*
    FROM cup_usage_history h
    JOIN cups c ON c.id = h.cup_id
    WHERE DATE(h.date) = ?
    ORDER BY h.date DESC
    LIMIT 1
  `,
    [today]
  );

  return result ?? null;
}
