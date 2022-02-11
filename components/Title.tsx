import {getRandomEmoji} from "../helper/emojis";
import styled from "styled-components";
import {FunctionComponent} from "react";

const TitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-bottom: grey solid 1px;
  padding: 0.5rem;
`;

const EmojiText = styled.p`
  margin-left: 0.5rem;
  font-size: x-large;
`

const Title: FunctionComponent = () => {
	return (
		<TitleDiv>
			<h1>EMODLE</h1>
			<EmojiText>{getRandomEmoji()}</EmojiText>
		</TitleDiv>
	)
}

export default Title;