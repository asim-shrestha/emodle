import {getRandomEmoji} from "../helper/emojis";
import styled from "styled-components";
import {FunctionComponent} from "react";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  border-bottom: lightgray solid 1px;
  padding: 0.5rem;
`;

const TitleDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`

const EmojiText = styled.p`
  margin-left: 0.25em;
  font-size: x-large;
  text-align: center;
  line-height: 1.5em;
`

const ImageButton = styled.img`
  color: black;
  border-radius: 100%;
  height: 25px;
  
  &:hover {
    background-color: ${(props: any) => props.isIncorrect ? "" : props.theme.colors.hover};
    cursor: ${(props: any) => props.isIncorrect ? "not-allowed" : "pointer"};
  }
`

type TitleProps = {
	openHelpModal: () => void;
	openSettingsModal: () => void;
}
const Title: FunctionComponent<TitleProps> = ({openHelpModal, openSettingsModal}) => {
	return (
		<HeaderContainer>
			<ImageButton src={"/help.svg"} alt={"Help"} onClick={openHelpModal}/>
			<TitleDiv>
				<h1>EMODLE</h1>
				<EmojiText>{getRandomEmoji()}</EmojiText>
			</TitleDiv>
			<ImageButton src={"/settings.svg"} alt={"Settings"} onClick={openSettingsModal}/>
		</HeaderContainer>
	)
}

export default Title;