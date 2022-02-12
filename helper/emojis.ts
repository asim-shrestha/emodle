const prevEmojis = () => {
	return ["🔪", "✔️", "🐦", "🍎", "🌪️", "🙏", "📚", "⬇️", "🤠", "👻", "❌", "1️⃣", "😤", "💩", "🔥", "🧠", "👽", "👨‍🍳", "👃", "🙈", "🐕", "👩", "👦", "💘", "👀", "👄", "🤡", "☠️", "🥵", "💦", "🌎", "🥶"];
}

const getEmojiList = () => {
	return ["🧚", "‍🧽", "👱‍♂️", "🐭", "🎩", "🦸", "👻", "🐷", "🤖", "🦀","🃏", "🐉", "⭐", "💤", "🔮", "🌊", "🧙", "🐶", "🦑", "🐱", "🕷️", "🍩", "🍺", "🌌", "🎥", "🐌", "🎁", "🐢"];
};

const getRandomEmoji = () => {
	const emojis = getEmojiList();
	return emojis[Math.floor(Math.random() * emojis.length)];
};

export {getEmojiList, getRandomEmoji};