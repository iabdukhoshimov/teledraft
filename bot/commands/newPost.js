import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';

// Use JSON file for storage
const adapter = new JSONFile('db/posts.json');
const defaultData = { posts: {}, users: [] };
const db = new Low(adapter, defaultData);

// Initialize database
async function initDB() {
  await db.read();
  db.data ||= { posts: {}, users: [] };
  await db.write();
}

export default async function newPost(bot) {
  await initDB();
  // Register /newpost command
  bot.onText(/\/newpost/, (msg) => {
    const keyboard = {
      inline_keyboard: [
        [{ text: '📝 Text', callback_data: 'NEWPOST_TEXT' }],
        [{ text: '🎞 GIF', callback_data: 'NEWPOST_GIF' }],
        [{ text: '🖼 Photo', callback_data: 'NEWPOST_PHOTO' }],
        [{ text: '📹 Video', callback_data: 'NEWPOST_VIDEO' }],
      ],
    };
    bot.sendMessage(msg.chat.id, 'Choose post type:', { reply_markup: keyboard });
  });

  // Handle post type selection
  bot.on('callback_query', async (msg) => {
    const chatId = msg.message.chat.id;
    const userId = msg.from.id;
    const data = msg.data;
    await bot.answerCallbackQuery(msg.id);
    switch (data) {
      case 'NEWPOST_PHOTO':
        bot.sendMessage(chatId, '🖼 Please send the photo:');
        bot.once('photo', (msg) => {
          const fileId = msg.photo[msg.photo.length - 1].file_id;
          const caption = msg.caption || '';
          bot.sendMessage(chatId, 'Enter a name for this photo post:');
          bot.once('message', async (msg) => {
            const name = msg.text;
            await db.read();
            db.data.posts[name] = { type: 'photo', file_id: fileId, caption };
            await db.write();
            bot.sendMessage(chatId, `✅ Photo post *${name}* created!`, { parse_mode: 'Markdown' });
          });
        });
        break;
      case 'NEWPOST_VIDEO':
        bot.sendMessage(chatId, '📹 Please send the video:');
        bot.once('video', (msg) => {
          const fileId = msg.video.file_id;
          const caption = msg.caption || '';
          bot.sendMessage(chatId, 'Enter a name for this video post:');
          bot.once('message', async (msg) => {
            const name = msg.text;
            await db.read();
            db.data.posts[name] = { type: 'video', file_id: fileId, caption };
            await db.write();
            bot.sendMessage(chatId, `✅ Video post *${name}* created!`, { parse_mode: 'Markdown' });
          });
        });
        break;
      // Add cases for TEXT and GIF if not already implemented
    }
  });

  // Send post command
  bot.onText(/\/sendpost (.+)/, async (msg, match) => {
    const name = match[1];
    await db.read();
    const post = db.data.posts[name];

    if (!post) return bot.sendMessage(msg.chat.id, '❌ Post not found!');

    switch (post.type) {
      case 'photo':
        bot.sendPhoto(msg.chat.id, post.file_id, { caption: post.caption });
        break;
      case 'video':
        bot.sendVideo(msg.chat.id, post.file_id, { caption: post.caption });
        break;
      // Add cases for text and GIF
    }
  });
}

console.log('Bot started with photo/video support');