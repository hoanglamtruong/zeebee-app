export interface BankAccount {
  id: "techcombank" | "bidv";
  name: string;
  shortName: string;
  bankName: string;
  accountNumber: string;
  accountName: string;
  bankCode: string;
}

export const PRIMARY_BANK: BankAccount = {
  id: "techcombank",
  name: "Techcombank",
  shortName: "TCB",
  bankName: "Ngân hàng TMCP Kỹ Thương Việt Nam (Techcombank)",
  accountNumber: "8525060689",
  accountName: "TRUONG HOANG LAM",
  bankCode: "TCB",
};

export function getTransferSyntax(orderCode: string): string {
  return `ZB ${orderCode.trim().toUpperCase()}`;
}

export function getVietQrUrl(amount: number, orderCode: string): string {
  const syntax = getTransferSyntax(orderCode);
  const addInfo = encodeURIComponent(syntax);
  const accountName = encodeURIComponent(PRIMARY_BANK.accountName);
  return `https://img.vietqr.io/image/${PRIMARY_BANK.bankCode}-${PRIMARY_BANK.accountNumber}-compact2.png?amount=${amount}&addInfo=${addInfo}&accountName=${accountName}`;
}
