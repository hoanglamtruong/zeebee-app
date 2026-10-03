import { DatabaseSync } from "node:sqlite";
import fs from "fs";
import path from "path";

const DB_PATH = process.env.ZEEBEE_APP_DB_PATH || path.join(process.cwd(), "data", "zeebee-app.db");

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

declare global {
  // eslint-disable-next-line no-var
  var __zeebeeAppDb: DatabaseSync | undefined;
}

const db = global.__zeebeeAppDb ?? new DatabaseSync(DB_PATH);
if (process.env.NODE_ENV !== "production") {
  global.__zeebeeAppDb = db;
}

db.exec("PRAGMA busy_timeout = 5000;");
db.exec("PRAGMA journal_mode = WAL;");

db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    contact TEXT NOT NULL,
    package_interest TEXT NOT NULL,
    message TEXT,
    created_at TEXT NOT NULL
  );
`);

export interface LeadRecord {
  id: number;
  name: string;
  contact: string;
  packageInterest: string;
  message: string | null;
  createdAt: string;
}

interface LeadRow {
  id: number;
  name: string;
  contact: string;
  package_interest: string;
  message: string | null;
  created_at: string;
}

function rowToRecord(row: LeadRow): LeadRecord {
  return {
    id: row.id,
    name: row.name,
    contact: row.contact,
    packageInterest: row.package_interest,
    message: row.message,
    createdAt: row.created_at,
  };
}

export function createLead(input: {
  name: string;
  contact: string;
  packageInterest: string;
  message?: string;
}): LeadRecord {
  const now = new Date().toISOString();
  const result = db
    .prepare(
      `INSERT INTO leads (name, contact, package_interest, message, created_at)
       VALUES (?, ?, ?, ?, ?)`
    )
    .run(input.name, input.contact, input.packageInterest, input.message ?? null, now);

  const row = db.prepare("SELECT * FROM leads WHERE id = ?").get(result.lastInsertRowid) as unknown as LeadRow;
  return rowToRecord(row);
}

export default db;
