import {FunctionComponent} from "react";
import Modal, {ModalProps} from "./Modal";
import TileRow from "./TileRow";

const HelpModal: FunctionComponent<ModalProps> = ({isOpen, handleClose}) => {
	return (
		<Modal isOpen={isOpen} handleClose={handleClose}>
			<>
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
			</>
		</Modal>
	)
}

export default HelpModal;