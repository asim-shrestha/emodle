const getEmojiList = () => {
  return ["🔪", "✔️", "🐦", "🍎", "🧱", "🙏", "📚", "🚚", "❌", "1️⃣", "😤", "💩", "🔥", "🧠", "👽", "👨‍🍳", "👃", "🙈", "🐕", "👩", "👦", "💘", "👀", "👄", "🤡", "☠️", "🥵"];
};

const getRandomEmoji = () => {
  const emojis = getEmojiList();
  return emojis[Math.floor(Math.random() * emojis.length)];
};

export { getEmojiList, getRandomEmoji };
