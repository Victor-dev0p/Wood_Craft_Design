import { createClient, type Client } from "@libsql/client";
import { drizzle, type LibSQLDatabase } from "drizzle-orm/libsql";
import fs from "fs";
import path from "path";
import * as schema from "./schema";

type Schema = typeof schema;

let client: Client | null = null;
let dbInstance: LibSQLDatabase<Schema> | null = null;
let migrated = false;

function resolveUrl() {
  if (process.env.TURSO_DATABASE_URL) return process.env.TURSO_DATABASE_URL;
  if (process.env.VERCEL) return "file:/tmp/atelier.db";
  const dir = path.join(process.cwd(), "data");
  fs.mkdirSync(dir, { recursive: true });
  return `file:${path.join(dir, "atelier.db")}`;
}

export function getDb() {
  if (dbInstance) return dbInstance;
  client = createClient({
    url: resolveUrl(),
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  dbInstance = drizzle(client, { schema });
  return dbInstance;
}

export async function ensureSchema() {
  if (migrated) return;
  const c = client ?? createClient({
    url: resolveUrl(),
    authToken: process.env.TURSO_AUTH_TOKEN,
  });
  if (!client) client = c;
  await c.executeMultiple(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS newsletter (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      created_at INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS quotes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      category TEXT NOT NULL,
      wood TEXT NOT NULL,
      dimensions TEXT,
      budget TEXT,
      notes TEXT,
      created_at INTEGER NOT NULL
    );
  `);
  migrated = true;
}
