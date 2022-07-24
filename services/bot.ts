import { getConfigs } from "env-ts-conf";
import { Telegraf } from "telegraf";

export const telegramConfig = getConfigs({
  token: {
    type: "string",
    variableName: "TELEGRAM_TOKEN",
  },
  chatID: {
    type: "string",
    variableName: "TELEGRAM_ADMIN_CHAT_ID",
  },
});

class TelegramBot {
  private readonly bot: Telegraf;
  constructor(token: string, private readonly adminChat: string) {
    this.bot = new Telegraf(token);
  }

  async sendToAdmin(message: string) {
    await this.bot.telegram.sendMessage(telegramConfig.chatID, message);
  }
}

export const bot = new TelegramBot(telegramConfig.token, telegramConfig.chatID);
