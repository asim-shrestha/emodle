import styled from "styled-components";
import {FunctionComponent} from "react";
import {getEmojiList} from "../helper/emojis";
import Image from "next/Image";

const KeyboardGrid = styled.div`
  display: grid;
  grid-template-rows:repeat(4, 4em);
  grid-auto-flow: column;
  column-gap:0.5rem;

  @media (max-width: 480px) {
    grid-template-rows:repeat(4, 3.5em);
  }
`;

const KeyboardButton = styled.div<{isCorrect?: boolean, isIncorrect?: boolean}>`
  display: grid;
  padding: 0.25rem;
  font-size: 1.25rem;
  height: 3rem;
  place-items: center;
  background-color: ${(props: any) => props.isCorrect ? "green" : (props.isIncorrect ? "#383838" : props.theme.colors.background)};
  border-radius: 10%;
  
  @media (max-width: 480px) {
    font-size: 1rem;
    height: 2.5rem;
  }
  
  &:hover {
	background-color: ${(props: any) => props.isIncorrect ? "" : props.theme.colors.hover};
	cursor: ${(props: any) => props.isIncorrect ? "not-allowed" : "pointer"};
  }
  
  &:active {
	background-color: ${(props) => props.theme.colors.dark};
  }
`;

const FunctionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem
`;


type KeyboardProps = {
	incorrectList: string[];
	correctList: string[];
	handleAddLetter: (letter: string) => void;
	handleEnter: () => void;
	handleClear: () => void;
	handleUndo: () => void;
}
const Keyboard: FunctionComponent<KeyboardProps> = ({incorrectList, correctList, handleAddLetter, handleEnter, handleClear, handleUndo}) => {
	const emojis = getEmojiList();

	return (
		<div>
			<KeyboardGrid>
				{
					emojis.map((emoji: string) => <KeyboardButton key={emoji} isIncorrect={incorrectList.indexOf(emoji) > -1} isCorrect={correctList.indexOf(emoji) > -1} onClick={() => handleAddLetter(emoji)}>{emoji}</KeyboardButton>)
				}
			</KeyboardGrid>
			<FunctionButtons>
				<KeyboardButton onClick={handleEnter}>Enter</KeyboardButton>
				<KeyboardButton onClick={handleClear}>Clear</KeyboardButton>
				<KeyboardButton onClick={handleUndo}>
					<Image src="/backspace.svg" height={25} width={30} alt={"Backspace Icon"}/>
				</KeyboardButton>
			</FunctionButtons>
		</div>
	)
}

export default Keyboard;

