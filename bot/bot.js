// bot/bot.js
import TelegramBot from 'node-telegram-bot-api';
import { BOT_TOKEN } from '../config/index.js';
import registerCommands from './handlers/messageHandler.js';

let bot;

export function initBot() {
  bot = new TelegramBot(BOT_TOKEN, { polling: true });
  console.log('🤖 TeleDraft bot started...');
  registerCommands(bot);
}
