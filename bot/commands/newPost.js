// bot/commands/newPost.js

export default function newPost(bot) {
  bot.onText(/\/newpost/, async (msg) => {
    const chatId = msg.chat.id;

    const keyboard = {
      inline_keyboard: [
        [
          { text: '📝 Tekst', callback_data: 'NEWPOST_TEXT' },
          { text: '🖼 Rasm', callback_data: 'NEWPOST_PHOTO' }
        ],
        [
          { text: '🎞 GIF', callback_data: 'NEWPOST_GIF' },
          { text: '📹 Video', callback_data: 'NEWPOST_VIDEO' }
        ]
      ]
    };

    bot.sendMessage(chatId, '📌 *Post turini tanlang:*', {
      parse_mode: 'Markdown',
      reply_markup: keyboard
    });
  });

  bot.on('callback_query', async (query) => {
    const chatId = query.message.chat.id;
    const postType = query.data;

    switch (postType) {
      case 'NEWPOST_TEXT':
        return handleTextPost(bot, chatId, query.id);
      case 'NEWPOST_GIF':
        return handleGifPost(bot, chatId, query.id);
      default:
        return bot.answerCallbackQuery(query.id, { text: '🚧 Hozircha faqat text va gif!' });
    }
  });
}

// Text post handler
function handleTextPost(bot, chatId, queryId) {
  bot.answerCallbackQuery(queryId);
  bot.sendMessage(chatId, '📝 Iltimos, post matnini yuboring:');

  bot.once('message', (msg) => {
    const text = msg.text;
    if (!text || text.startsWith('/')) {
      return bot.sendMessage(chatId, "❌ Matn noto'g'ri. Qayta urinib ko'ring.");
    }

    bot.sendMessage(chatId, '📌 Endi ushbu post uchun nom bering:');

    bot.once('message', async (nameMsg) => {
      const name = nameMsg.text.trim();
      if (!name || name.startsWith('/')) {
        return bot.sendMessage(chatId, "❌ Noto'g'ri nom.");
      }

      const { setPost } = await import('../../db/lowdb.js');
      await setPost(name, text);
      bot.sendMessage(chatId, `✅ *${name}* nomli post saqlandi!`, { parse_mode: 'Markdown' });
    });
  });
}

// GIF post handler
function handleGifPost(bot, chatId, queryId) {
  bot.answerCallbackQuery(queryId);
  bot.sendMessage(chatId, '*Sarlavhali GIF yuboring.*\n_Sarlavha majburiy emas._', { parse_mode: 'Markdown' });

  bot.once('message', async (msg) => {
    if (!msg.animation) {
      return bot.sendMessage(chatId, '❌ Faqat GIF yuboring iltimos.');
    }

    const gifFileId = msg.animation.file_id;
    const caption = msg.caption || '';

    bot.sendMessage(chatId, '📌 Endi ushbu post uchun nom bering:');

    bot.once('message', async (nameMsg) => {
      const name = nameMsg.text.trim();
      if (!name || name.startsWith('/')) {
        return bot.sendMessage(chatId, "❌ Noto'g'ri nom.");
      }

      const { setPost } = await import('../../db/lowdb.js');
      await setPost(name, { type: 'gif', file_id: gifFileId, caption });
      bot.sendMessage(chatId, `✅ *${name}* nomli GIF post saqlandi!`, { parse_mode: 'Markdown' });
    });
  });
}
