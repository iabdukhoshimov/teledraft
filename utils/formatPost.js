// utils/formatPost.js

const emojis = ['😀', '🎉', '🔥', '😎', '✨'];

export default function formatPost(content) {
  const emoji = emojis[Math.floor(Math.random() * emojis.length)];
  return `${content}\n\n${emoji}`;
}

