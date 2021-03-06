import styled from "styled-components";
import {FunctionComponent} from "react";
import {getEmojiList} from "../helper/emojis";

const KeyboardGrid = styled.div`
  display: grid;
  grid-template-rows:repeat(4, 4em);
  grid-auto-flow: column;
  column-gap:0.5rem;

  @media (max-width: 480px) {
    grid-template-rows:repeat(4, 2.75em);
  }
`;

const KeyboardButton = styled.div<{isCorrect?: boolean, isMisplaced?: boolean, isIncorrect?: boolean}>`
  display: grid;
  padding: 0.25rem;
  font-size: 1.25rem;
  height: 3rem;
  place-items: center;
  background-color: ${(props: any) => (
  	props.isCorrect ? props.theme.colors.correct : (
  		props.isMisplaced ? props.theme.colors.misplaced : (
  			props.isIncorrect ? props.theme.colors.incorrect : props.theme.colors.background
		)
	)
  )};
  border-radius: 10%;
  
  @media (max-width: 480px) {
    font-size: 1rem;
    height: 1.75rem;
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
	correctList: string[];
	misplacedList: string[]
	incorrectList: string[];
	handleAddLetter: (letter: string) => void;
	handleEnter: () => void;
	handleClear: () => void;
	handleUndo: () => void;
}
const Keyboard: FunctionComponent<KeyboardProps> = ({correctList, misplacedList, incorrectList, handleAddLetter, handleEnter, handleClear, handleUndo}) => {
	const emojis = getEmojiList();

	return (
		<div>
			<KeyboardGrid>
				{
					emojis.map((emoji: string) => <KeyboardButton
						key={emoji}
						isCorrect={correctList.indexOf(emoji) > -1}
						isMisplaced={misplacedList.indexOf(emoji) > -1}
						isIncorrect={incorrectList.indexOf(emoji) > -1}
						onClick={() => handleAddLetter(emoji)}
					>
						{emoji}
					</KeyboardButton>)
				}
			</KeyboardGrid>
			<FunctionButtons>
				<KeyboardButton onClick={handleEnter}>Enter</KeyboardButton>
				<KeyboardButton onClick={handleClear}>Clear</KeyboardButton>
				<KeyboardButton onClick={handleUndo}>
					<img src="/backspace.svg" height={25} width={30} alt={"Backspace Icon"}/>
				</KeyboardButton>
			</FunctionButtons>
		</div>
	)
}

export default Keyboard;

