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
  line-height: 3rem;
  font-size: 2rem;
  border-radius: 10px;
  text-align: center;

  @media (max-width: 480px) {
    width: 2.25rem;
    height: 2.25rem;
    line-height: 2.25rem;
    font-size: 1.5rem;
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