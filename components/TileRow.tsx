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
`

type TileProps = {
	letters: string[],
	emodle: string[],
	isFinished: boolean,
}

const TileRow: FunctionComponent<TileProps> = ({letters, emodle, isFinished}) => {
	const getLetterStates = (): string[] => {
		const emodleCopy = [...emodle];
		const letterStates = ["", "", "", "", ""];

		for(let i = 0; i < letters.length; i++) {
			if(letters[i] == emodleCopy[i]) { letterStates[i] = "correct"}
		}
		return letterStates;
	}

	const letterStates = getLetterStates();

	return (
		<TilesContainer>
			{
				letters.map((letter: string, i) =>
					<TileDiv
						key={i + letter}
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