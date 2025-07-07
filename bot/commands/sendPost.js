// bot/commands/sendPost.js
import { getPost } from '../../db/lowdb.js';
import formatPost from '../../utils/formatPost.js';

export default function sendPost(bot) {
  bot.onText(/\/sendpost/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '📌 Send the name of the post:');

    bot.once('message', async (nameMsg) => {
      const name = nameMsg.text.trim();

      if (!name || name.startsWith('/')) {
        return bot.sendMessage(chatId, '❌ Invalid name.');
      }

      const content = await getPost(name);
      if (!content) {
        return bot.sendMessage(chatId, `❌ Post *${name}* not found.`, { parse_mode: 'Markdown' });
      }

      bot.sendMessage(chatId, formatPost(content), { parse_mode: 'Markdown' });
    });
  });
}

