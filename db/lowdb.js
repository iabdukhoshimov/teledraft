// db/lowdb.js
const { Low } = require('lowdb');
const { JSONFile } = require('lowdb/node');
const path = require('path');

const file = path.resolve('./db/posts.json')
const adapter = new JSONFile(file)
const db = new Low(adapter, { posts: {} })

async function initDB() {
  await db.read()

  // 🚨 Here's the key fix
  if (!db.data) {
    db.data = { posts: {} }
    await db.write()
  }
}

async function setPost(name, content) {
  await initDB()
  db.data.posts[name] = content
  await db.write()
}

async function getPosts() {
  await initDB()
  return db.data.posts
}

async function getPost(name) {
  await initDB()
  return db.data.posts[name]
}

async function deletePost(name) {
  await initDB()
  delete db.data.posts[name]
  await db.write()
}

module.exports = {
  setPost,
  getPosts,
  getPost,
  deletePost,
};
