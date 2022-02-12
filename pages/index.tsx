import type {NextPage} from 'next'
import styled from "styled-components";
import {useEffect, useState} from "react";
import GameBoard from "../components/Gameboard";
import Title from "../components/Title";
import Keyboard from "../components/Keyboard";
import { use100vh } from 'react-div-100vh'
import {getGameEndText} from "../helper/score";


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
	const emodleText = "Avatar the last Air Bender.";
	const [emodle, setEmodle] = useState<string[]>(["💦", "🌎", "🔥", "🌪️", "⬇️"]);
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

	const numLetters = 5;
	const numRows = 6;

	// Load data
	useEffect(() => {
		let data = JSON.parse(localStorage.getItem("emodle_data") || "{}");
		if(!data.emodle || data.emodle.join("") != emodle.join("")) { return; }
		setCurrRow(data.currRow);
		setCurrIndex(data.currIndex);
		setIsFinished(data.isFinished);
		setCorrectList(data.correctList);
		setIncorrectList(data.incorrectList);
		setLetters(data.letters);
	}, [])

	// Save data
	useEffect(() => {
		if(letters[0][0] == "") { return; }
		let data = {
			emodle: emodle,
			currRow: currRow,
			currIndex: currIndex,
			isFinished: isFinished,
			correctList: correctList,
			incorrectList: incorrectList,
			letters: letters,
		}
		localStorage.setItem("emodle_data", JSON.stringify(data));

	}, [emodle, currRow, currIndex, isFinished, correctList, incorrectList, letters])
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
		for(let i = currIndex - 1; i > -1 ; i--) {
			changeLetterAtPosition("", i);
		}
		setCurrIndex(0);
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

	const handleShare = async () => {
		let textToShare = getGameEndText(emodle, letters);
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
			await navigator.share({text: textToShare});
		} else {
			await navigator.clipboard.writeText(textToShare);
			alert("Copied results to your clipboard!");
		}
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
							<button onClick={handleShare}>Share</button>
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
