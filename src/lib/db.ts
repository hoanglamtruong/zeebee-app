import { DatabaseSync } from "node:sqlite";
import fs from "fs";
import path from "path";

const DB_PATH = process.env.ZEEBEE_APP_DB_PATH || path.join(process.cwd(), "data", "zeebee-app.db");

fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });

declare global {
  // eslint-disable-next-line no-var
  var __zeebeeAppDb: DatabaseSync | undefined;
}

let _db: DatabaseSync | null = null;

export function getDb(): DatabaseSync {
  if (!_db) {
    if (global.__zeebeeAppDb) {
      _db = global.__zeebeeAppDb;
    } else {
      fs.mkdirSync(path.dirname(DB_PATH), { recursive: true });
      _db = new DatabaseSync(DB_PATH);
      if (process.env.NODE_ENV !== "production") {
        global.__zeebeeAppDb = _db;
      }
      try {
        _db.exec("PRAGMA busy_timeout = 10000;");
        _db.exec("PRAGMA journal_mode = WAL;");
      } catch {
        // Ignore if locked during concurrent init
      }
      _db.exec(`
        CREATE TABLE IF NOT EXISTS leads (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT NOT NULL,
          contact TEXT NOT NULL,
          package_interest TEXT NOT NULL,
          message TEXT,
          created_at TEXT NOT NULL
        );
      `);
      _db.exec(`
        CREATE TABLE IF NOT EXISTS trials (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          product_slug TEXT NOT NULL,
          ip TEXT,
          user_agent TEXT,
          created_at TEXT NOT NULL
        );
      `);
      _db.exec(`
        CREATE TABLE IF NOT EXISTS orders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          code TEXT NOT NULL UNIQUE,
          kind TEXT NOT NULL,
          product_slug TEXT,
          device_code TEXT,
          license_key TEXT,
          amount INTEGER DEFAULT 0,
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          details TEXT NOT NULL,
          status TEXT NOT NULL DEFAULT 'new',
          paid_at TEXT,
          telegram_sent INTEGER NOT NULL DEFAULT 0,
          created_at TEXT NOT NULL
        );
      `);

      // Safe column migrations for existing databases
      try { _db.exec("ALTER TABLE orders ADD COLUMN device_code TEXT;"); } catch {}
      try { _db.exec("ALTER TABLE orders ADD COLUMN license_key TEXT;"); } catch {}
      try { _db.exec("ALTER TABLE orders ADD COLUMN amount INTEGER DEFAULT 0;"); } catch {}
      try { _db.exec("ALTER TABLE orders ADD COLUMN paid_at TEXT;"); } catch {}
    }
  }
  return _db;
}

// Proxy ?? c?c l?i g?i db.prepare / db.exec ho?t ??ng b?nh th??ng nh?ng kh?ng m? file SQLite khi Next.js build
const db = new Proxy({} as DatabaseSync, {
  get(_target, prop) {
    const realDb = getDb();
    const val = (realDb as unknown as Record<string | symbol, unknown>)[prop];
    return typeof val === "function" ? (val as (...args: unknown[]) => unknown).bind(realDb) : val;
  },
});

export interface OrderRecord {
  id: number;
  code: string;
  kind: "product" | "custom" | "key_purchase";
  productSlug: string | null;
  deviceCode?: string | null;
  licenseKey?: string | null;
  amount?: number;
  name: string;
  phone: string;
  details: Record<string, string>;
  status: string;
  paidAt?: string | null;
  createdAt: string;
}

interface OrderRow {
  id: number;
  code: string;
  kind: string;
  product_slug: string | null;
  device_code: string | null;
  license_key: string | null;
  amount: number | null;
  name: string;
  phone: string;
  details: string;
  status: string;
  paid_at: string | null;
  created_at: string;
}

function parseOrderRow(row: OrderRow): OrderRecord {
  let details: Record<string, string> = {};
  try {
    details = JSON.parse(row.details || "{}");
  } catch {}
  return {
    id: row.id,
    code: row.code,
    kind: (details.orderType === "key_purchase" || row.kind === "key_purchase" ? "key_purchase" : row.kind) as "product" | "custom" | "key_purchase",
    productSlug: row.product_slug,
    deviceCode: row.device_code,
    licenseKey: row.license_key,
    amount: row.amount ?? 0,
    name: row.name,
    phone: row.phone,
    details,
    status: row.status,
    paidAt: row.paid_at,
    createdAt: row.created_at,
  };
}

export function createOrder(input: {
  kind: "product" | "custom" | "key_purchase";
  productSlug?: string;
  deviceCode?: string;
  licenseKey?: string;
  amount?: number;
  name: string;
  phone: string;
  details: Record<string, string>;
  status?: string;
}): OrderRecord {
  const now = new Date().toISOString();
  const prefix = input.kind === "key_purchase" ? "ZB-KEY" : "ZB-APP";
  const code = `${prefix}-${Date.now().toString().slice(-6)}${Math.floor(Math.random() * 10)}`;
  
  // Safe kind column: keep "product" if older db schema checks ('product', 'custom')
  const dbKind = input.kind === "custom" ? "custom" : "product";
  const payloadDetails = { ...input.details };
  if (input.kind === "key_purchase") {
    payloadDetails.orderType = "key_purchase";
  }

  const result = db
    .prepare(
      `INSERT INTO orders (code, kind, product_slug, device_code, license_key, amount, name, phone, details, status, created_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      code,
      dbKind,
      input.productSlug ?? null,
      input.deviceCode ?? null,
      input.licenseKey ?? null,
      input.amount ?? 0,
      input.name,
      input.phone,
      JSON.stringify(payloadDetails),
      input.status || (input.kind === "key_purchase" ? "pending_payment" : "new"),
      now
    );

  return {
    id: Number(result.lastInsertRowid),
    code,
    kind: input.kind,
    productSlug: input.productSlug ?? null,
    deviceCode: input.deviceCode ?? null,
    licenseKey: input.licenseKey ?? null,
    amount: input.amount ?? 0,
    name: input.name,
    phone: input.phone,
    details: payloadDetails,
    status: input.status || (input.kind === "key_purchase" ? "pending_payment" : "new"),
    createdAt: now,
  };
}

export function getOrderByCode(code: string): OrderRecord | null {
  const clean = code.trim().toUpperCase();
  const row = db.prepare("SELECT * FROM orders WHERE UPPER(code) = ?").get(clean) as unknown as OrderRow | undefined;
  if (!row) return null;
  return parseOrderRow(row);
}

export function markOrderPaid(code: string, licenseKey?: string): boolean {
  const now = new Date().toISOString();
  const clean = code.trim().toUpperCase();
  if (licenseKey) {
    db.prepare("UPDATE orders SET status = 'paid', paid_at = ?, license_key = ? WHERE UPPER(code) = ?").run(now, licenseKey, clean);
  } else {
    db.prepare("UPDATE orders SET status = 'paid', paid_at = ? WHERE UPPER(code) = ?").run(now, clean);
  }
  return true;
}

export function markOrderTelegramSent(id: number, sent: boolean) {
  db.prepare("UPDATE orders SET telegram_sent = ? WHERE id = ?").run(sent ? 1 : 0, id);
}

export function countRecentOrdersByPhone(phone: string, minutes: number): number {
  const since = new Date(Date.now() - minutes * 60_000).toISOString();
  const row = db
    .prepare("SELECT COUNT(*) AS c FROM orders WHERE phone = ? AND created_at >= ?")
    .get(phone, since) as unknown as { c: number };
  return row.c;
}

export interface TrialRecord {
  id: number;
  productSlug: string;
  ip: string | null;
  userAgent: string | null;
  createdAt: string;
}

export function recordTrialDownload(input: {
  productSlug: string;
  ip?: string;
  userAgent?: string;
}): TrialRecord {
  const now = new Date().toISOString();
  const result = db
    .prepare(
      `INSERT INTO trials (product_slug, ip, user_agent, created_at)
       VALUES (?, ?, ?, ?)`
    )
    .run(input.productSlug, input.ip ?? null, input.userAgent ?? null, now);

  return {
    id: Number(result.lastInsertRowid),
    productSlug: input.productSlug,
    ip: input.ip ?? null,
    userAgent: input.userAgent ?? null,
    createdAt: now,
  };
}

export interface LeadRecord {
  id: number;
  name: string;
  contact: string;
  packageInterest: string;
  message: string | null;
  createdAt: string;
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

  const row = db.prepare("SELECT * FROM leads WHERE id = ?").get(result.lastInsertRowid) as unknown as {
    id: number;
    name: string;
    contact: string;
    package_interest: string;
    message: string | null;
    created_at: string;
  };
  return {
    id: row.id,
    name: row.name,
    contact: row.contact,
    packageInterest: row.package_interest,
    message: row.message,
    createdAt: row.created_at,
  };
}

export default db;
