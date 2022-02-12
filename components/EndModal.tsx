import {FunctionComponent} from "react";
import Modal, {ModalProps} from "./Modal";
import TileRow from "./TileRow";
import styled from "styled-components";

const CenterDiv = styled.div`
  display: grid;
  place-items: center;
`
type EndModalProps = ModalProps & {
	emodleText: string,
	emodle: string[],
	won: boolean,
	handleShare: () => void;
}
const EndModal: FunctionComponent<EndModalProps> = ({emodleText, emodle, won, handleShare, isOpen, setIsOpen}) => {
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<>
				<h2>
					{
						won ? "Congratulations!" : "Better luck next time!"
					}
				</h2>
				<p>The hidden message was: <b>{emodleText}.</b><br/><br/></p>
				<p>The corresponding emodle was:</p>
				<CenterDiv>
					<TileRow letters={emodle} emodle={emodle} isFinished={true}/>
				</CenterDiv>
				<br/>
				<p>The next emodle will be available in.... <b>tomorrow (PST)?</b></p>
				<br/>

				<button onClick={handleShare}>Share</button>
			</>
		</Modal>
	)
}

export default EndModal;