import styled from "styled-components";
import {FunctionComponent} from "react";
import {use100vh} from 'react-div-100vh'
import TileRow from "./TileRow";

const ModalBackground = styled.div`
  // Fix the position at the top left
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;

  display: grid;
  place-items: center;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.9);
`;

const ModalDiv = styled.div`
  max-width: 60%;
  max-height: 80%;
  margin: 1em;

  @media (max-width: 480px) {
    max-width: 95%;
    max-height: 95%;
    margin: 1em;
  }

  border-radius: 1em;
  background-color: white;
  overflow: auto; /* Enable scroll if needed */
`

const ScrollContainer = styled.div`
  max-height: 100%;
  margin: 1em;
`

const ButtonsDiv = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
`


type ModalProps = {
	isOpen: boolean,
	handleClose: () => void;
}
const Modal: FunctionComponent<ModalProps> = ({isOpen, handleClose}) => {
	const viewportHeight = use100vh() || "100vh";

	return !isOpen ? <></> : (
		<ModalBackground style={{height: viewportHeight}} hidden={isOpen} onClick={handleClose}>
			<ModalDiv>
				<ScrollContainer>
					<h2>How to play </h2>
					<p>
						Guess the "emodle" in 6 tries. Each emodle is based on a common phrase or a pop culture
						reference.
						You'll have to guess what the emoji sequence is for the hidden phrase or reference. After
						each try, the color of the tiles will change.<br/><br/>
					</p>
					<div>
						<p><b>Example:</b> if the emodle is based on the phrase "Kill 2 birds with 1 stone", the emodle
							would be "🔪🐦🐦1️⃣🧱".</p>

						<TileRow letters={["🔪", "👨‍🍳", "👽", "👀", "👄"]} emodle={["🔪", "🐦", "🐦", "1️⃣", "🧱"]}
								 isFinished={true} onlyFirst={true}/>
						<p>The "knife" tile turned green because the emoji is in the emodle and is in the right
							spot.<br/><br/></p>

						<TileRow letters={["1️⃣", "📚", "💩", "👃", "🌪️"]} emodle={["🔪", "🐦", "🐦", "1️⃣", "🧱"]}
								 isFinished={true} onlyFirst={true}/>
						<p>The "one" tile turned orange because the emoji is in the emodle, but is in the wrong
							spot.<br/><br/></p>

						<TileRow letters={["☠️", "💦", "🙏", "🥶", "🌎"]} emodle={["🔪", "🐦", "🐦", "1️⃣", "🧱"]}
								 isFinished={true} onlyFirst={true}/>
						<p>The "skull" emoji turned grey because the emoji is not in the emodle at all.<br/><br/></p>
					</div>
					<button onClick={handleClose}>Close</button>
				</ScrollContainer>
			</ModalDiv>
		</ModalBackground>
	)
}

export default Modal;