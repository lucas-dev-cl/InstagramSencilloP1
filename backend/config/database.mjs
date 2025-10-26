import mysql2 from 'mysql2/promise'

let db;

export async function initDB() {
  if (!db) {
    db = await mysql2.createPool({
      user: "root",
      password: "Lucas123BC$21",
      host: "localhost",
      database: "instagramSimple"
    });
  }
  return db;
}

// función para usar la conexión cuando quieras
export function getDB() {
  if (!db) throw new Error("DB no inicializada, ejecutá initDB() primero");
  return db;
}
