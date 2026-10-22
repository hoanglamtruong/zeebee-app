// Báo đơn/yêu cầu mới về Telegram cho Admin / Seller
// (TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID trong .env, KHÔNG commit).
// Lưu ý: inline button chỉ nhận url http/https/tg — không dùng tel: (Telegram từ chối cả tin).

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
    console.warn("Chưa cấu hình TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID — bỏ qua gửi Telegram.");
    return false;
  }

  const body = lines
    .filter(([, v]) => v && v.trim())
    .map(([k, v]) => `<b>${escapeHtml(k)}:</b> ${escapeHtml(v)}`)
    .join("\n");

  const text = `${title}\n━━━━━━━━━━━━━━━━━━━━\n${body}\n━━━━━━━━━━━━━━━━━━━━\n⚡️ <i>Seller / Admin hãy kiểm tra đối soát và xử lý nhanh cho khách!</i>`;

  const keyboard: Array<Array<{ text: string; url: string }>> = [
    [{ text: "💬 Chat Zalo Với Khách", url: `https://zalo.me/${phone.replace(/[\s.-]/g, "")}` }]
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
    if (!data.ok) console.error("Telegram từ chối tin nhắn:", data.description);
    return data.ok === true;
  } catch (err) {
    console.error("Lỗi gửi Telegram:", err);
    return false;
  }
}
