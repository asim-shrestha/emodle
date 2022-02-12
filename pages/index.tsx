import type {NextPage} from 'next'
import styled from "styled-components";
import {useEffect, useState} from "react";
import GameBoard from "../components/Gameboard";
import Title from "../components/Title";
import Keyboard from "../components/Keyboard";
import { use100vh } from 'react-div-100vh'
import {getGameEndText, getLetterStates} from "../helper/score";
import HelpModal from "../components/HelpModal";
import WinModal from "../components/EndModal";


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
	const localStorageKey = "emodle_data_23ksies";
	const viewportHeight = use100vh() || "100vh";
	const day = 1;
	const hint = "A childhood animated show."
	const emodleText = "SpongeBob SquarePants";
	const [emodle] = useState<string[]>(["‍🧽","◼","👖","🍍","🌊"]);
	const [currRow, setCurrRow] = useState<number>(0);
	const [currIndex, setCurrIndex] = useState<number>(0);
	const [isFinished, setIsFinished] = useState<boolean>(false);
	const [won, setWon] = useState<boolean>(false);
	const [correctList, setCorrectList] = useState<string[]>([]);
	const [misplacedList, setMisplacedList] = useState<string[]>([]);
	const [incorrectList, setIncorrectList] = useState<string[]>([]);
	const [letters, setLetters] = useState<string[][]>([
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
		["", "", "", "", ""],
	]);
	const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);
	const [isWinModalOpen, setIsWinModalOpen] = useState<boolean>(false);

	const numLetters = 5;
	const numRows = 6;

	// Load data
	useEffect(() => {
		let data = JSON.parse(localStorage.getItem(localStorageKey) || "{}");
		if(!data.emodle || data.emodle.join("") != emodle.join("")) { setIsHelpModalOpen(true); return; }
		setCurrRow(data.currRow);
		setCurrIndex(data.currIndex);
		setIsFinished(data.isFinished);
		setWon(data.won);
		setCorrectList(data.correctList);
		setMisplacedList(data.misplacedList);
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
			won: won,
			correctList: correctList,
			misplacedList: misplacedList,
			incorrectList: incorrectList,
			letters: letters,
		}
		localStorage.setItem(localStorageKey, JSON.stringify(data));

	}, [emodle, currRow, currIndex, isFinished, correctList, incorrectList, letters])
	const changeLetterAtPosition = (letter: string, position: number) => {
		const newLetters = [...letters];
		newLetters[currRow][position] = letter;
		setLetters(newLetters);
	}

	useEffect(() => {
		if(!isFinished) { return; }
		setIsWinModalOpen(true);
	}, [isFinished])

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

		let checkWon = true;
		let newCorrectList = [...correctList];
		let newMisplacedList = [...misplacedList];
		let newIncorrectList = [...incorrectList];

		let letterStates = getLetterStates(emodle, letters[currRow]);
		for(let i = 0; i < letters[currRow].length; i++) {
			if(letterStates[i] != "correct") {
				checkWon = false
			}

			if(letterStates[i] == "correct") {
				newCorrectList.push(letters[currRow][i]);
			} else if(letterStates[i] == "misplaced") {
				newMisplacedList.push(letters[currRow][i]);
			} else {
				newIncorrectList.push(letters[currRow][i]);
			}
		}
		setCorrectList(newCorrectList);
		setMisplacedList(newMisplacedList);
		setIncorrectList(newIncorrectList);

		setWon(checkWon);
		console.log(checkWon, currRow + 1);
		setIsFinished((currRow + 1) >= numRows || checkWon);

		setCurrRow(currRow + 1);
		setCurrIndex(0);
	}

	const handleShare = async () => {
		let textToShare = getGameEndText(emodle, letters, day);
		if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
			await navigator.share({text: textToShare});
		} else {
			await navigator.clipboard.writeText(textToShare);
			alert("Copied results to your clipboard!");
		}
	}

	return (
		<PageLayout style={{height: viewportHeight}}>
			<HelpModal isOpen={isHelpModalOpen} setIsOpen={setIsHelpModalOpen}/>
			<WinModal emodleText={emodleText} emodle={emodle} won={won} handleShare={handleShare} isOpen={isWinModalOpen} setIsOpen={setIsWinModalOpen}/>
			<PageContent>
				<Title openHelpModal={() => setIsHelpModalOpen(true)}/>
				<GameBoard emodle={emodle} hint={hint} letters={letters} currRow={currRow}/>
				<Keyboard
					correctList={correctList}
					misplacedList={misplacedList}
					incorrectList={incorrectList}
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
