// bot/handlers/messageHandler.js
import newPost from '../commands/newPost.js';
import listPosts from '../commands/listPosts.js';
import sendPost from '../commands/sendPost.js';
import deletePost from '../commands/deletePost.js';

export default function registerCommands(bot) {
  newPost(bot);
  listPosts(bot);
  sendPost(bot);
  deletePost(bot);
}
