import styled, {css} from "styled-components";
import {FunctionComponent} from "react";
import {getLetterStates} from "../helper/score";

const TilesContainer = styled.div`
  display: flex;
  gap: 0.25rem;
`;

const TileDiv = styled.div<{isFinished: boolean, isCorrect: boolean, isMisplaced: boolean}>`
  display: grid;
  place-items: center;
  width: 3rem;
  height: 3rem;
  font-size: 2rem;

  @media (max-width: 480px) {
    width: 2.5rem;
    height: 2.5rem;
    font-size: 1.75rem;
  }
  
  ${(props: any) => !props.isFinished && 
		  css`
			border: 2px solid ${(props) => props.theme.colors.outline};
		  `}

  ${(props: any) => (props.isFinished && props.isCorrect) &&
		  css`
			margin: 2px;
			background-color: ${(props) => props.theme.colors.correct};
		  `}
  ${(props: any) => (props.isFinished && !props.isCorrect) &&
		  css`
			margin: 2px;
			background-color: ${(props) => props.theme.colors.incorrect};
		  `}
  ${(props: any) => (props.isFinished && props.isMisplaced) &&
		  css`
			margin: 2px;
			background-color: ${(props) => props.theme.colors.misplaced};
		  `}
`

type TileRowProps = {
	letters: string[],
	emodle: string[],
	isFinished: boolean,
	onlyFirst?: boolean,
}
const TileRow: FunctionComponent<TileRowProps> = ({letters, emodle, isFinished, onlyFirst}) => {
	const letterStates = getLetterStates(emodle, letters);

	return (
		<TilesContainer>
			{
				letters.map((letter: string, i) =>
					<TileDiv
						key={i + letter}
						isFinished={onlyFirst ? (i == 0) && isFinished : isFinished}
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