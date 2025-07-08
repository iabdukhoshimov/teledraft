// bot/commands/sendPost.js
import { getPost } from '../../db/lowdb.js';
import formatPost from '../../utils/formatPost.js';

export default function sendPost(bot) {
  bot.onText(/\/sendpost/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '📌 Post nomini yuboring:');

    bot.once('message', async (nameMsg) => {
      const name = nameMsg.text.trim();
      if (!name || name.startsWith('/')) {
        return bot.sendMessage(chatId, "❌ Noto'g'ri nom.");
      }

      const content = await getPost(name);
      if (!content) {
        return bot.sendMessage(chatId, `❌ *${name}* topilmadi.`, { parse_mode: 'Markdown' });
      }

      const post = formatPost(content);

      if (typeof post === 'string') {
        bot.sendMessage(chatId, post, { parse_mode: 'Markdown' });
      } else if (post.type === 'gif') {
        bot.sendAnimation(chatId, post.file_id, {
          caption: post.caption || '',
          parse_mode: 'Markdown'
        });
      } else {
        bot.sendMessage(chatId, "❌ Nomaʼlum post formati.");
      }
    });
  });
}
