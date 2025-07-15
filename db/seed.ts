import { dbPromise } from "./database";

export async function seedInitialData() {
  const db = await dbPromise;

  // Comprobar si ya existen tazas
  const existing: any[] = await db.getAllAsync(
    `SELECT COUNT(*) as count FROM cups`
  );
  if (existing[0]?.count > 0) return;

  const now = new Date().toISOString();

  // 1. Insertar categorías
  await db.execAsync(`
    INSERT INTO categories (name, is_seasonal, start_date, end_date)
    VALUES
      ('Navidad', 1, '2025-12-01', '2026-01-10'),
      ('Halloween', 1, '2025-10-01', '2025-10-31'),
      ('Diaria', 0, NULL, NULL);
  `);

  // Obtener IDs de categorías
  const categories = await db.getAllAsync(`SELECT id, name FROM categories`);
  const navidadId = categories.find((c) => c.name === "Navidad")?.id;
  const halloweenId = categories.find((c) => c.name === "Halloween")?.id;
  const diariaId = categories.find((c) => c.name === "Diaria")?.id;

  // 2. Insertar tazas con categoría asignada
  await db.execAsync(`
    INSERT INTO cups (name, imageUri, category_id, is_favorite, created_at)
    VALUES
      ('Taza de ejemplo', '', ${diariaId}, 1, '${now}'),
      ('Taza Halloween', '', ${halloweenId}, 0, '${now}'),
      ('Taza Navideña', '', ${navidadId}, 1, '${now}');
  `);

  // 3. Insertar historial de uso para simular datos
  const cups = await db.getAllAsync(`SELECT id, name FROM cups`);
  const tazaRoja = cups.find((c) => c.name === "Taza de ejemplo")?.id;
  const tazaNavideña = cups.find((c) => c.name === "Taza Navideña")?.id;

  await db.execAsync(`
    INSERT INTO cup_usage_history (cup_id, date)
    VALUES
      (${tazaRoja}, '2025-07-10'),
      (${tazaRoja}, '2025-07-11'),
      (${tazaNavideña}, '2025-12-25');
  `);
}
