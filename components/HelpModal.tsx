import {FunctionComponent} from "react";
import Modal, {ModalProps} from "./Modal";
import TileRow from "./TileRow";

const HelpModal: FunctionComponent<ModalProps> = ({isOpen, setIsOpen}) => {
	let helpEmodle = ["💦", "🌎", "🔥", "🌪️", "⬇️"];
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<>
				<h2>How to play </h2>
				<p>
					Guess the &ldquo;emodle&rdquo; in 6 tries. Each emodle is based on references to TV shows, games, or movies.
					You&apos;ll have to guess what the emoji sequence is that corresponds to the hidden reference is.
					(Make sure you pay attention to the hint at the top of the game!)
					After each try, the color of the tiles will change based on how you did.<br/><br/>
				</p>
				<div>
					<p><b>Example:</b> if the emodle is based on &ldquo;Avatar: The Last Airbender&rdquo;, the emodle
						would be &ldquo;💦🌎🔥🌪️⬇️&rdquo;.<br/><br/></p>

					<TileRow letters={["💦", "👨‍🍳", "👽", "👀", "👄"]} emodle={helpEmodle}
							 isFinished={true} onlyFirst={true}/>
					<p>The &ldquo;water&rdquo; tile turned green because the emoji is in the emodle and is in the right
						spot.<br/><br/></p>

					<TileRow letters={["🌎", "📚", "💩", "👃", "🌪️"]} emodle={helpEmodle}
							 isFinished={true} onlyFirst={true}/>
					<p>The &ldquo;earth&rdquo; tile turned orange because the emoji is in the emodle, but is in the wrong
						spot.<br/><br/></p>

					<TileRow letters={["☠️", "💦", "🙏", "🥶", "🌎"]} emodle={helpEmodle}
							 isFinished={true} onlyFirst={true}/>
					<p>The &ldquo;skull&rdquo; emoji turned grey because the emoji is not in the emodle at all.<br/><br/></p>
				</div>
			</>
		</Modal>
	)
}

export default HelpModal;