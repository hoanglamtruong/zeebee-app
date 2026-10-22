// V?NG 2: B?o ??n/y?u c?u m?i v? Telegram cho Admin / Seller
// (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID trong .env, KH?NG commit).
// L?u ?: inline button ch? nh?n url http/https/tg ? kh?ng d?ng tel: (Telegram t? ch?i c? tin).

function escapeHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export interface TelegramButton {
  text: string;
  url: string;
}

export async function sendTelegram(
  title: string,
  lines: [string, string][],
  phone: string,
  customButtons?: TelegramButton[]
): Promise<boolean> {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) {
    console.warn("Ch?a c?u h?nh TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID ? b? qua g?i Telegram.");
    return false;
  }

  const body = lines
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `<b>${escapeHtml(k)}:</b> ${escapeHtml(v)}`)
    .join("\n");

  const text = `${title}\n????????????????????\n${body}\n????????????????????\n?? <i>Seller / Admin h?y ki?m tra ??i so?t v? x? l? nhanh cho kh?ch!</i>`;

  const keyboard: Array<Array<{ text: string; url: string }>> = [
    [{ text: "?? Chat Zalo V?i Kh?ch", url: `https://zalo.me/${phone.replace(/[\s.-]/g, "")}` }]
  ];

  if (customButtons && customButtons.length > 0) {
    for (const btn of customButtons) {
      keyboard.push([{ text: btn.text, url: btn.url }]);
    }
  }

  try {
    const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text,
        parse_mode: "HTML",
        reply_markup: { inline_keyboard: keyboard },
      }),
    });
    const data = await res.json();
    if (!data.ok) console.error("Telegram t? ch?i tin nh?n:", data.description);
    return data.ok === true;
  } catch (err) {
    console.error("L?i g?i Telegram:", err);
    return false;
  }
}
