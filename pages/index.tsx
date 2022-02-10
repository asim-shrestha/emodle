import type {NextPage} from 'next'
import {getEmojiList, getRandomEmoji} from '../helper/emojis';
import styled from "styled-components";
import {useState} from "react";
import TileRow from "../components/TileRow";


type LayoutRowProps = {
    gap?: string
}
const LayoutRow = styled.div`
    display: flex;
    gap: ${(props: LayoutRowProps) => props.gap};
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
    background-color: ${(props) => props.theme.colors.background};
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
	const numLetters = 5;
	const [currIndex, setCurrIndex] = useState<number>(0);
	const [letters, setLetters] = useState<string[]>(["", "", "", "", ""]);
	const emojis = getEmojiList();


	const changeLetterAtPosition = (letter: string, position: number) => {
		const newLetters = [...letters];
		newLetters[position] = letter;
		setLetters(newLetters);
	}

	const handleAddLetter = (letter: string) => {
		if(currIndex == numLetters) { return; }
		changeLetterAtPosition(letter, currIndex);
		setCurrIndex(currIndex + 1);
	}

	const handleUndo = () => {
		const prevIndex = Math.max(0, currIndex - 1);
		changeLetterAtPosition("", prevIndex);
		setCurrIndex(prevIndex);
	}

	const handleEnter = () => {}

	return (
		<div>
			EMODLE {getRandomEmoji()}
			<GameBoard>
				<TileRow letters={letters}/>
				<TileRow letters={letters}/>
				<TileRow letters={letters}/>
				<TileRow letters={letters}/>
				<TileRow letters={letters}/>
				<TileRow letters={letters}/>
            </GameBoard>
			<LayoutRow gap={'1rem'}>
				{
					emojis.map((emoji: string) => <KeyboardButton key={emoji} onClick={() => handleAddLetter(emoji)}>{emoji}</KeyboardButton>)
				}
				<KeyboardButton onClick={handleEnter}>Enter</KeyboardButton>
				<KeyboardButton onClick={handleUndo}>{' <= '}</KeyboardButton>
			</LayoutRow>
		</div>
	)
}

export default Home
