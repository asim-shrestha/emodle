const getLetterStates = (emodle: string[], letters: string[]): string[] => {
	const emodleCopy = [...emodle];
	const letterBank = [...emodle];
	const letterStates = ["", "", "", "", ""];

	// Get correct letters
	for(let i = 0; i < letters.length; i++) {
		if(letters[i] == emodleCopy[i]) {
			letterStates[i] = "correct"

			// Remove correct letter from letter bank
			const index = letterBank.indexOf(letters[i]);
			letterBank.splice(index, 1); // 2nd parameter means remove one item only
		}
	}

	// Get misplaced letters if available
	for(let i = 0; i < letterStates.length; i++) {
		if(letterStates[i] == "correct") { continue; }

		const index = letterBank.indexOf(letters[i]);
		if(index > -1) {
			letterStates[i] = "misplaced"

			// Remove correct letter from letter bank
			letterBank.splice(index, 1); // 2nd parameter means remove one item only
		}
	}

	return letterStates;
}

const getGameEndText = (emodle: string[], allLetters: string[][], day: number): string => {
	let rowScores = "";
	let numRows = 1;
	for(let letters of allLetters) {
		let failed = false;
		let rowScore = "";
		let rowStates = getLetterStates(emodle, letters);
		for(let state of rowStates) {
			if (state == "correct") {rowScore += "🟩"}
			else if (state == "misplaced") {rowScore += "🟨"; failed = true;}
			else {rowScore += "⬜"; failed = true;}
		}

		rowScores += rowScore + "\n";
		if (failed) { numRows += 1; }
		else { break; }
	}

	let gameEndText = `Emodle ${day}, ${numRows}/6\n\n`;
	gameEndText += rowScores;
	gameEndText += `\nBeat my score at ${window.location.origin} #Emodle`;

	return gameEndText;
}

export {getLetterStates, getGameEndText};