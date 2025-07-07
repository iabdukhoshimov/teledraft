// bot/handlers/messageHandler.js
const newPost = require('../commands/newPost');
const listPosts = require('../commands/listPosts');
const sendPost = require('../commands/sendPost');

module.exports = function registerCommands(bot) {
  newPost(bot);
  listPosts(bot);
  sendPost(bot);
};
