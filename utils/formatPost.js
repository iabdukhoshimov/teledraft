// utils/formatPost.js

const emojis = ['😀', '🎉', '🔥', '😎', '✨'];

export default function formatPost(content) {
  if (typeof content === 'string') {
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    return `${content}\n\n${emoji}`;
  }

  return content; // return object { type, file_id, caption } untouched
}
