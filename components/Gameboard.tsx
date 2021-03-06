import styled from "styled-components";
import {FunctionComponent} from "react";
import TileRow from "./TileRow";

const GameBoardLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
`

type GameBoardProps = {
	emodle: string[],
	hint: string,
	letters: string[][],
	currRow: number
}
const GameBoard: FunctionComponent<GameBoardProps> = ({emodle, hint, letters, currRow}) => {
	return (
		<GameBoardLayout>
			<p><b>Hint:</b> {hint}</p>
			<TileRow letters={letters[0]} emodle={emodle} isFinished={currRow > 0}/>
			<TileRow letters={letters[1]} emodle={emodle} isFinished={currRow > 1}/>
			<TileRow letters={letters[2]} emodle={emodle} isFinished={currRow > 2}/>
			<TileRow letters={letters[3]} emodle={emodle} isFinished={currRow > 3}/>
			<TileRow letters={letters[4]} emodle={emodle} isFinished={currRow > 4}/>
			<TileRow letters={letters[5]} emodle={emodle} isFinished={currRow > 5}/>
		</GameBoardLayout>
	)
}

export default GameBoard;