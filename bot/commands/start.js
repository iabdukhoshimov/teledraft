// bot/commands/start.js

export default function start(bot) {
  bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    const firstName = msg.from.first_name;

    const welcomeText = `👋 Salom, *${firstName || 'foydalanuvchi'}*!\n\n` +
      `Xabarlar yaratishni boshlashdan oldin, quyidagi til sozlamalari tugmasini bosing, tilingizni tanlang.`;

    const menu = {
      keyboard: [
        ['🌟 Saralanganlar', '📰 Post yaratish'],
        ['🇬🇧 Language', '🇷🇺 Язык', '🇺🇿 Til', '🇰🇿 Тіл', '🇹🇲 Dil']
      ],
      resize_keyboard: true,
      one_time_keyboard: false
    };

    bot.sendMessage(chatId, welcomeText, {
      parse_mode: 'Markdown',
      reply_markup: menu
    });
  });
}
