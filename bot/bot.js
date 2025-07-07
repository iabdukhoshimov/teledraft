// bot/bot.js
const TelegramBot = require('node-telegram-bot-api');
const { BOT_TOKEN } = require('../config');
const registerCommands = require('./handlers/messageHandler');

let bot;

const initBot = () => {
  bot = new TelegramBot(BOT_TOKEN, { polling: true });
  console.log('🤖 TeleDraft bot started...');
  registerCommands(bot);
};

module.exports = { initBot };
