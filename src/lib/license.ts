import crypto from "crypto";

export const ZEEBEE_LICENSE_SECRET = process.env.ZEEBEE_LICENSE_SECRET || "ZB_SECRET_2026_OFFLINE_PRO";

export function generateLicenseKey(deviceCode: string): string {
  const cleanCode = (deviceCode || "").trim().toUpperCase();
  if (!cleanCode) return "";

  const raw = `${cleanCode}:${ZEEBEE_LICENSE_SECRET}`;
  const hash = crypto.createHash("sha256").update(raw).digest("hex").toUpperCase();

  const p1 = hash.slice(0, 4);
  const p2 = hash.slice(4, 8);
  const p3 = hash.slice(8, 12);
  const p4 = hash.slice(12, 16);

  return `ZBKEY-${p1}-${p2}-${p3}-${p4}`;
}

export function verifyLicenseKey(deviceCode: string, inputKey: string): boolean {
  const cleanInput = (inputKey || "").trim().toUpperCase();
  const expected = generateLicenseKey(deviceCode);
  return cleanInput === expected;
}
