// bot/commands/newPost.js
import { setPost } from '../../db/lowdb.js';

export default function newPost(bot) {
  bot.onText(/\/newpost/, async (msg) => {
    const chatId = msg.chat.id;

    bot.sendMessage(chatId, '📝 Please send the content of the post:');

    bot.once('message', async (contentMsg) => {
      const content = contentMsg.text;

      if (!content || content.startsWith('/')) {
        return bot.sendMessage(chatId, '❌ Invalid content. Try /newpost again.');
      }

      bot.sendMessage(chatId, '📌 Now send a name for this post:');

      bot.once('message', async (nameMsg) => {
        const name = nameMsg.text.trim();

        if (!name || name.startsWith('/')) {
          return bot.sendMessage(chatId, '❌ Invalid name. Try /newpost again.');
        }

        await setPost(name, content);
        bot.sendMessage(chatId, `✅ Post *${name}* saved!`, { parse_mode: 'Markdown' });
      });
    });
  });
}
