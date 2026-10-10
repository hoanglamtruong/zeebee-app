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

// VÒNG 2: đơn mua sản phẩm đóng gói (kind=product) và yêu cầu build theo nhu cầu (kind=custom).
// Khách dừng ở bước gửi; Seller nhận Telegram, tự liên hệ chốt rồi cập nhật status sau.
db.exec(`
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL UNIQUE,
    kind TEXT NOT NULL CHECK (kind IN ('product', 'custom')),
    product_slug TEXT,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    details TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'new',
    telegram_sent INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
  );
`);

export interface OrderRecord {
  id: number;
  code: string;
  kind: "product" | "custom";
  productSlug: string | null;
  name: string;
  phone: string;
  details: Record<string, string>;
  status: string;
  createdAt: string;
}

export function createOrder(input: {
  kind: "product" | "custom";
  productSlug?: string;
  name: string;
  phone: string;
  details: Record<string, string>;
}): OrderRecord {
  const now = new Date().toISOString();
  const code = `ZB-APP-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 10)}`;
  const result = db
    .prepare(
      `INSERT INTO orders (code, kind, product_slug, name, phone, details, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .run(code, input.kind, input.productSlug ?? null, input.name, input.phone, JSON.stringify(input.details), now);
  return {
    id: Number(result.lastInsertRowid),
    code,
    kind: input.kind,
    productSlug: input.productSlug ?? null,
    name: input.name,
    phone: input.phone,
    details: input.details,
    status: "new",
    createdAt: now,
  };
}

export function markOrderTelegramSent(id: number, sent: boolean) {
  db.prepare("UPDATE orders SET telegram_sent = ? WHERE id = ?").run(sent ? 1 : 0, id);
}

// Chống gửi rác: đếm số đơn cùng SĐT trong N phút gần nhất.
export function countRecentOrdersByPhone(phone: string, minutes: number): number {
  const since = new Date(Date.now() - minutes * 60_000).toISOString();
  const row = db
    .prepare("SELECT COUNT(*) AS c FROM orders WHERE phone = ? AND created_at >= ?")
    .get(phone, since) as unknown as { c: number };
  return row.c;
}

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
