import type {NextPage} from 'next'
import {getEmojiList, getRandomEmoji} from '../helper/emojis';
import styled from "styled-components";
import {useState} from "react";
import GameBoard from "../components/Gameboard";

const PageLayout = styled.div`
  padding-top: 1em;
  padding-bottom: 3em;
  height: calc(100vh - 4em);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`

type LayoutRowProps = {
    gap?: string
}
const LayoutRow = styled.div`
    display: flex;
    gap: ${(props: LayoutRowProps) => props.gap};
  	max-width: 480px;
`

const KeyboardGrid = styled.div`
  display: grid;
  grid-template-rows:repeat(3, 5.5em);
  grid-auto-flow: column;
  column-gap:1rem;
`

const KeyboardButton = styled.div`
    display: grid;
    padding: 0.25rem;
    font-size: 1.5rem;
    height: 3rem;
    place-items: center;
    background-color: ${(props: any) => props.isCorrect ? "green" : (props.isIncorrect ? "#383838" : props.theme.colors.background)};
    border-radius: 10%;
      
    &:hover {
      background-color: ${(props: any) => props.isIncorrect ? "" : props.theme.colors.hover};
      cursor: ${(props: any) => props.isIncorrect ? "not-allowed" : "pointer"};
    }

    &:active {
      background-color: ${(props) => props.theme.colors.dark};
    }
`;

const Home: NextPage = () => {
	const [currRow, setCurrRow] = useState<number>(0);
	const [currIndex, setCurrIndex] = useState<number>(0);
	const [isFinished, setIsFinished] = useState<boolean>(false);
	const [correct, setCorrect] = useState<string[]>([]);
	const [incorrect, setIncorrect] = useState<string[]>([]);
	const [letters, setLetters] = useState<string[][]>([
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
	]);

	const emojis = getEmojiList();
	const emodleText = "Kill two birds with one stone.";
	const emodle = ["🔪", "🐦", "🐦", "1️⃣", "🧱"];
	const numLetters = 5;
	const numRows = 6;

	const changeLetterAtPosition = (letter: string, position: number) => {
		const newLetters = [...letters];
		newLetters[currRow][position] = letter;
		setLetters(newLetters);
	}

	const handleAddLetter = (letter: string) => {
		if(currIndex >= numLetters || currRow >= numRows || isFinished || incorrect.indexOf(letter) > -1) { return; }
		changeLetterAtPosition(letter, currIndex);
		setCurrIndex(currIndex + 1);
	}

	const handleUndo = () => {
		const prevIndex = Math.max(0, currIndex - 1);
		changeLetterAtPosition("", prevIndex);
		setCurrIndex(prevIndex);
	}

	const handleEnter = () => {
		if(currIndex < numLetters) { return; }

		let checkFinish = true;
		let newCorrect = [...correct];
		let newIncorrect = [...incorrect];
		for(let i = 0; i < letters.length; i++) {
			if(letters[currRow][i] == undefined) { continue; }
			if(letters[currRow][i] != emodle[i]) {
				checkFinish = false;
			}

			// Check if input text was correct or not to update the keyboard
			if(emodle.indexOf(letters[currRow][i]) > -1) {
				newCorrect.push(letters[currRow][i]);
				setCorrect([...correct, letters[currRow][i]])
			} else {
				newIncorrect.push(letters[currRow][i]);
				setIncorrect([...incorrect, letters[currRow][i]])
			}
		}
		setCorrect(newCorrect);
		setIncorrect(newIncorrect);
		setIsFinished(checkFinish);

		setCurrRow(currRow + 1);
		setCurrIndex(0);
	}

	return (
		<PageLayout>
			<h1>
				EMODLE {getRandomEmoji()}
			</h1>
			{
				isFinished ?
					<div>
						<h2>{emodleText}</h2>
						<p>{emodle}</p>
					</div> :
					<></>
			}
			<GameBoard emodle={emodle} letters={letters} currRow={currRow}/>
			<KeyboardGrid>
				{
					// @ts-ignore
					emojis.map((emoji: string) => <KeyboardButton key={emoji} isIncorrect={incorrect.indexOf(emoji) > -1} isCorrect={correct.indexOf(emoji) > -1} onClick={() => handleAddLetter(emoji)}>{emoji}</KeyboardButton>)
				}
			</KeyboardGrid>
			<LayoutRow gap={'1rem'}>
				<KeyboardButton onClick={handleEnter}>Enter</KeyboardButton>
				<KeyboardButton onClick={handleUndo}>{' <= '}</KeyboardButton>
			</LayoutRow>
		</PageLayout>
	)
}

export default Home
