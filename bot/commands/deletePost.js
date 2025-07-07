// bot/commands/deletePost.js
import { deletePost as removePost, getPost } from '../../db/lowdb.js';

export default function deletePost(bot) {
  bot.onText(/\/deletepost/, (msg) => {
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, '🗑 Send the name of the post to delete:');

    bot.once('message', async (nameMsg) => {
      const name = nameMsg.text.trim();

      if (!name || name.startsWith('/')) {
        return bot.sendMessage(chatId, '❌ Invalid name.');
      }

      const exists = await getPost(name);
      if (!exists) {
        return bot.sendMessage(chatId, `❌ Post *${name}* not found.`, { parse_mode: 'Markdown' });
      }

      await removePost(name);
      bot.sendMessage(chatId, `✅ Post *${name}* deleted.`, { parse_mode: 'Markdown' });
    });
  });
}

