import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: false });

export const sendTelegram = async (msg) => {
  try {
    const chatId = process.env.CHAT_ID || "<YOUR_CHAT_ID>";
    await bot.sendMessage(chatId, msg);
  } catch (err) {
    console.log("Telegram error:", err.message);
  }
};
