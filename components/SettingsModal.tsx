import {FunctionComponent} from "react";
import Modal, {ModalProps} from "./Modal";

const SettingsModal: FunctionComponent<ModalProps> = ({isOpen, setIsOpen}) => {
	return (
		<Modal isOpen={isOpen} setIsOpen={setIsOpen}>
			<>
				<h2>Settings</h2>
				<p><b>Contact:</b> <a href={"https://github.com/asim-shrestha"}>GitHub</a></p>
				<p><b>Social:</b> <a href={"https://www.linkedin.com/in/a-shrestha/"}>LinkedIn</a></p>
				<p><b>Social:</b> <a href={"https://twitter.com/asimdotshrestha/"}>Twitter</a></p>
				<br/>
			</>
		</Modal>
	)
}

export default SettingsModal;