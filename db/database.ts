// database.ts
import { CupUsageHistoryWithCup } from "@/types/Cups";
import * as SQLite from "expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";
import { withDbLock } from "./dbLock";

// Abrir la base de datos de forma asíncrona
export const dbPromise: Promise<SQLiteDatabase> =
  SQLite.openDatabaseAsync("cups.db");

// Inicializa las tablas
export async function initDatabase() {
  const db = await dbPromise;
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS cups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      imageUri TEXT,
      category_id INTEGER,
      is_favorite INTEGER DEFAULT 0,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      is_seasonal INTEGER DEFAULT 0,
      start_date TEXT,
      end_date TEXT
    );
    CREATE TABLE IF NOT EXISTS cup_usage_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cup_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      FOREIGN KEY (cup_id) REFERENCES cups(id)
    );
  `);
}

// Inserta una nueva taza y retorna su id
export async function addCup({
  name,
  imageUri,
  category_id,
  is_favorite = 0,
}: {
  name: string;
  imageUri: string;
  category_id?: number;
  is_favorite?: number;
}): Promise<number> {
  const db = await dbPromise;
  const now = new Date().toISOString();

  const res = await db.runAsync(
    `INSERT INTO cups (name, imageUri, category_id, is_favorite, created_at)
     VALUES (?, ?, ?, ?, ?)`,
    [name, imageUri, category_id ?? null, is_favorite, now]
  );

  return res.lastInsertRowId;
}

export async function getAllCups(): Promise<any[]> {
  const db = await dbPromise;
  return db.getAllAsync(`SELECT * FROM cups ORDER BY created_at DESC`);
}

export async function getFavoriteCups(): Promise<any[]> {
  const db = await dbPromise;
  return db.getAllAsync(`SELECT * FROM cups WHERE is_favorite = 1`);
}

export async function deleteCup(id: number) {
  const db = await dbPromise;
  await db.runAsync(`DELETE FROM cups WHERE id = ?`, [id]);
}

export async function updateCup(
  id: number,
  name: string,
  imageUri: string,
  is_favorite: number
) {
  const db = await dbPromise;
  await db.runAsync(
    `UPDATE cups SET name = ?, imageUri = ?, is_favorite = ? WHERE id = ?`,
    [name, imageUri, is_favorite, id]
  );
}

export async function updateCupFavorite(id: number, is_favorite: number) {
  const db = await dbPromise;
  await db.runAsync(`UPDATE cups SET is_favorite = ? WHERE id = ?`, [
    is_favorite,
    id,
  ]);
}

// USO

export async function logCupUsage(cup_id: number, date: string) {
  const db = await dbPromise;
  await db.runAsync(
    `INSERT INTO cup_usage_history (cup_id, date) VALUES (?, ?)`,
    [cup_id, date]
  );
}

export async function getUsageByMonth(
  year: number,
  month: number
): Promise<any[]> {
  const db = await dbPromise;
  const start = `${year}-${String(month).padStart(2, "0")}-01`;
  const end = `${year}-${String(month).padStart(2, "0")}-31`;
  return db.getAllAsync(
    `SELECT * FROM cup_usage_history WHERE date BETWEEN ? AND ?`,
    [start, end]
  );
}

export async function getCupUsageHistory(): Promise<CupUsageHistoryWithCup[]> {
  return withDbLock(async () => {
    const db = await dbPromise;

    return db.getAllAsync<CupUsageHistoryWithCup>(`
      SELECT h.id, h.cup_id, h.date, c.name AS cupName, c.imageUri AS cupImageUri
      FROM cup_usage_history h
      JOIN cups c ON c.id = h.cup_id
      ORDER BY h.date DESC
    `);
  });
}
// CATEGORÍAS

export async function addCategory(
  name: string,
  is_seasonal = 0,
  start_date?: string,
  end_date?: string
): Promise<number> {
  const db = await dbPromise;
  const res = await db.runAsync(
    `INSERT INTO categories (name, is_seasonal, start_date, end_date)
     VALUES (?, ?, ?, ?)`,
    [name, is_seasonal, start_date ?? null, end_date ?? null]
  );
  return res.lastInsertRowId;
}

export async function getAllCategories(): Promise<any[]> {
  const db = await dbPromise;
  return db.getAllAsync(`SELECT * FROM categories ORDER BY name ASC`);
}

export async function deleteCategory(id: number) {
  const db = await dbPromise;
  await db.runAsync(`DELETE FROM categories WHERE id = ?`, [id]);
}

export async function updateCategory(
  id: number,
  name: string,
  is_seasonal: number,
  start_date?: string,
  end_date?: string
) {
  const db = await dbPromise;
  await db.runAsync(
    `UPDATE categories SET name = ?, is_seasonal = ?, start_date = ?, end_date = ? WHERE id = ?`,
    [name, is_seasonal, start_date ?? null, end_date ?? null, id]
  );
}

// LIMPIAR TODA LA BASE

export async function resetDatabase() {
  const db = await dbPromise;
  await db.execAsync(`
    DELETE FROM cup_usage_history;
    DELETE FROM cups;
    DELETE FROM categories;
  `);
  console.log("Todo eliminado");
}
