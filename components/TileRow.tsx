import styled, {css} from "styled-components";
import {FunctionComponent} from "react";

const TilesContainer = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const TileDiv = styled.div`
	  display: grid;
	  place-items: center;
	  width: 3rem;
	  height: 3rem;
	  font-size: 2rem;
	
	  ${(props: any) => !props.isFinished && 
			  css`
	  			border: 2px solid ${(props) => props.theme.colors.outline};
			  `}

      ${(props: any) => (props.isFinished && props.isCorrect) &&
              css`
	  			margin: 2px;
				color: black;
				background-color: green;
			  `}
      ${(props: any) => (props.isFinished && !props.isCorrect) &&
              css`
	  			margin: 2px;
				color: black;
				background-color: grey;
			  `}
      ${(props: any) => (props.isFinished && props.isMisplaced) &&
              css`
	  			margin: 2px;
				color: black;
				background-color: yellow;
			  `}
`

type TileRowProps = {
	letters: string[],
	emodle: string[],
	isFinished: boolean,
}
const TileRow: FunctionComponent<TileRowProps> = ({letters, emodle, isFinished}) => {
	const getLetterStates = (): string[] => {
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

	const letterStates = getLetterStates();

	// @ts-ignore
	return (
		<TilesContainer>
			{
				letters.map((letter: string, i) =>
					<TileDiv
						key={i + letter}
	// @ts-ignore
						isFinished={isFinished}
						isCorrect={letterStates[i] == "correct"}
						isMisplaced={letterStates[i] == "misplaced"}
					>
						{letter}
					</TileDiv> )
			}
		</TilesContainer>
	);
}

export default TileRow;