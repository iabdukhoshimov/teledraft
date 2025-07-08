bot.onText(/\/start/, async (msg) => {
  const userId = msg.from.id;
  const user = db.data.users.find(u => u.id === userId);
  if (!user) {
    const keyboard = {
      inline_keyboard: [
        [{ text: '🇬🇧 English', callback_data: 'lang_en' }],
        [{ text: '🇷🇺 Русский', callback_data: 'lang_ru' }],
      ],
    };
    bot.sendMessage(msg.chat.id, '🌐 Please select your language:', { reply_markup: keyboard });
  } else {
    bot.sendMessage(msg.chat.id, await getTranslation(userId, 'welcome', { name: msg.from.first_name }));
  }
});

// Add to newPost.js callback handler
bot.on('callback_query', async (msg) => {
  const userId = msg.from.id;
  const chatId = msg.message.chat.id;
  const data = msg.data;
  await bot.answerCallbackQuery(msg.id);

  if (data.startsWith('lang_')) {
    const lang = data.split('_')[1];
    await setUserLanguage(userId, lang);
    bot.sendMessage(chatId, await getTranslation(userId, 'language_set'));
    return;
  }

  // Existing switch statement here
  switch (data) {
    // ... your cases
  }
});