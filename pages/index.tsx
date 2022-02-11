import type {NextPage} from 'next'
import styled from "styled-components";
import {useState} from "react";
import GameBoard from "../components/Gameboard";
import Title from "../components/Title";
import Keyboard from "../components/Keyboard";
import { use100vh } from 'react-div-100vh'


const PageLayout = styled.div`
  max-width: 100vw;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`

const PageContent = styled.div`
  padding-bottom: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`


const Home: NextPage = () => {
	const viewportHeight = use100vh()
	const [currRow, setCurrRow] = useState<number>(0);
	const [currIndex, setCurrIndex] = useState<number>(0);
	const [isFinished, setIsFinished] = useState<boolean>(false);
	const [correctList, setCorrectList] = useState<string[]>([]);
	const [incorrectList, setIncorrectList] = useState<string[]>([]);
	const [letters, setLetters] = useState<string[][]>([
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
	]);

	const emodleText = "Avatar the last Air Bender.";
	const emodle = ["💦", "🌎", "🔥", "🌪️", "⬇️"];
	const numLetters = 5;
	const numRows = 6;

	const changeLetterAtPosition = (letter: string, position: number) => {
		const newLetters = [...letters];
		newLetters[currRow][position] = letter;
		setLetters(newLetters);
	}

	const handleAddLetter = (letter: string) => {
		if(currIndex >= numLetters || currRow >= numRows || isFinished || incorrectList.indexOf(letter) > -1) { return; }
		changeLetterAtPosition(letter, currIndex);
		setCurrIndex(currIndex + 1);
	}

	const handleUndo = () => {
		const prevIndex = Math.max(0, currIndex - 1);
		if(letters[currRow][prevIndex] == "") { return; }
		changeLetterAtPosition("", prevIndex);
		setCurrIndex(prevIndex);
	}

	const handleClear = () => {
		for(let i = 0; i <= currIndex; i++) {
			handleUndo();
		}
	}

	const handleEnter = () => {
		if(currIndex < numLetters) { return; }

		let checkFinish = true;
		let newCorrectList = [...correctList];
		let newIncorrectList = [...incorrectList];
		for(let i = 0; i < letters.length; i++) {
			if(letters[currRow][i] == undefined) { continue; }
			if(letters[currRow][i] != emodle[i]) {
				checkFinish = false;
			}

			// Check if input text was correct or not to update the keyboard
			if(emodle.indexOf(letters[currRow][i]) > -1) {
				newCorrectList.push(letters[currRow][i]);
				setCorrectList([...correctList, letters[currRow][i]])
			} else {
				newIncorrectList.push(letters[currRow][i]);
				setIncorrectList([...incorrectList, letters[currRow][i]])
			}
		}
		setCorrectList(newCorrectList);
		setIncorrectList(newIncorrectList);
		setIsFinished(checkFinish);

		setCurrRow(currRow + 1);
		setCurrIndex(0);
	}

	return (
		// @ts-ignore
		<PageLayout style={{height: viewportHeight}}>
			<PageContent>
				<Title/>
				{
					isFinished ?
						<div>
							<h2>{emodleText}</h2>
							<p>{emodle}</p>
						</div> :
						<></>
				}
				<GameBoard emodle={emodle} letters={letters} currRow={currRow}/>
				<Keyboard
					incorrectList={incorrectList}
					correctList={correctList}
					handleAddLetter={handleAddLetter}
					handleEnter={handleEnter}
					handleClear={handleClear}
					handleUndo={handleUndo}
				/>
			</PageContent>
		</PageLayout>
	)
}

export default Home
