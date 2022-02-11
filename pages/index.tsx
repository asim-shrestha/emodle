import type {NextPage} from 'next'
import {getEmojiList, getRandomEmoji} from '../helper/emojis';
import styled from "styled-components";
import {useState} from "react";
import TileRow from "../components/TileRow";

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

const GameBoard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`

const KeyboardButton = styled.div`
    display: grid;
    padding: 0.25rem;
    font-size: 1.5rem;
    height: 4rem;
    place-items: center;
    background-color: ${(props: any) => props.isCorrect ? "green" : (props.isIncorrect ? "#383838" : props.theme.colors.background)};
    border-radius: 10%;
      
    &:hover {
      background-color: ${(props) => props.theme.colors.hover};
      cursor: pointer;
    }

    &:active {
      background-color: ${(props) => props.theme.colors.dark};
    }
`;

const Home: NextPage = () => {
	const emodleText = "Will you be my valentine? 💘";
	const emodle = ["💘", "👦", "👩", "🐕", "💘"];
	const numLetters = 5;
	const numRows = 6;
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


	const changeLetterAtPosition = (letter: string, position: number) => {
		const newLetters = [...letters];
		newLetters[currRow][position] = letter;
		setLetters(newLetters);
	}

	const handleAddLetter = (letter: string) => {
		if(currIndex >= numLetters || currRow >= numRows || isFinished) { return; }
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

			if(emodle.indexOf(letters[currRow][i]) > -1) {
				newCorrect.push(letters[currRow][i]);
				setCorrect([...correct, letters[currRow][i]])
			} else {
				newIncorrect.push(letters[currRow][i]);
				console.log("FOUND BAD", letters[currRow][i])
				setIncorrect([...incorrect, letters[currRow][i]])
			}
		}
		setCorrect(newCorrect);
		setIncorrect(newIncorrect);
		setIsFinished(checkFinish);

		console.log("CORRECT", correct);
		console.log("INCORRECt", incorrect);
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
			<GameBoard>
				<TileRow letters={letters[0]} emodle={emodle} isFinished={currRow > 0}/>
				<TileRow letters={letters[1]} emodle={emodle} isFinished={currRow > 1}/>
				<TileRow letters={letters[2]} emodle={emodle} isFinished={currRow > 2}/>
				<TileRow letters={letters[3]} emodle={emodle} isFinished={currRow > 3}/>
				<TileRow letters={letters[4]} emodle={emodle} isFinished={currRow > 4}/>
				<TileRow letters={letters[5]} emodle={emodle} isFinished={currRow > 5}/>
            </GameBoard>
			<KeyboardGrid>
				{
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
