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
	  border: 2px solid ${(props) => props.theme.colors.outline};
	
	  ${(props: any) => props.disabled && 
			  css`
				opacity: 0.5;
				cursor: not-allowed;
			  `}
`

type TileProps = {
	letters: string[]
}

const TileRow: FunctionComponent<TileProps> = ({letters}) => {
	return (
		<TilesContainer>
			{
				letters.map((letter: string, i) => <TileDiv key={i + letter}>{letter}</TileDiv> )
			}
		</TilesContainer>
	);
}

export default TileRow;