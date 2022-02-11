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
  grid-template-rows:repeat(2, 5.5em);
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
		<PageLayout>
			<h1>
				EMODLE {getRandomEmoji()}
			</h1>
			<GameBoard>
				<TileRow letters={letters}/>
				<TileRow letters={letters}/>
				<TileRow letters={letters}/>
				<TileRow letters={letters}/>
				<TileRow letters={letters}/>
				<TileRow letters={letters}/>
            </GameBoard>
			<KeyboardGrid>
				{
					emojis.map((emoji: string) => <KeyboardButton key={emoji} onClick={() => handleAddLetter(emoji)}>{emoji}</KeyboardButton>)
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
