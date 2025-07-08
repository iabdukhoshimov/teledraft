import { Low } from 'lowdb';
import { JSONFile } from 'lowdb/node';
import path from 'path';

const file = path.resolve('./db/posts.json');
const adapter = new JSONFile(file);
const db = new Low(adapter, { posts: {} });

async function initDB() {
  await db.read();
  if (!db.data) {
    db.data = { posts: {} };
    await db.write();
  }
}

export async function setPost(name, content) {
  await initDB();
  db.data.posts[name] = content;
  await db.write();
}

export async function getPosts() {
  await initDB();
  return db.data.posts;
}

export async function getPost(name) {
  await initDB();
  return db.data.posts[name];
}

export async function deletePost(name) {
  await initDB();
  delete db.data.posts[name];
  await db.write();
}
