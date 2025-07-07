// bot/commands/listPosts.js
import { getPosts } from '../../db/lowdb.js';

export default function listPosts(bot) {
  bot.onText(/\/listposts/, async (msg) => {
    const chatId = msg.chat.id;
    const posts = await getPosts();
    const names = Object.keys(posts);

    if (names.length === 0) {
      return bot.sendMessage(chatId, 'ℹ️ No saved posts.');
    }

    const message = names.map((n, i) => `${i + 1}. ${n}`).join('\n');
    bot.sendMessage(chatId, `📋 Saved posts:\n${message}`);
  });
}

