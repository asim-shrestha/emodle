import styled from "styled-components";
import {Dispatch, FunctionComponent, SetStateAction} from "react";
import {use100vh} from 'react-div-100vh'

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


type ModalProps = {
	isOpen: boolean,
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	children?: JSX.Element,
}
const Modal: FunctionComponent<ModalProps> = ({isOpen, setIsOpen, children}) => {
	const viewportHeight = use100vh() || "100vh";
	const close = () => {
		setIsOpen(false);
	}
	return !isOpen ? <></> : (
		<ModalBackground style={{height: viewportHeight}} hidden={isOpen}>
			<ModalDiv>
				<ScrollContainer>
					{children}
					<button onClick={close}>Close</button>
				</ScrollContainer>
			</ModalDiv>
		</ModalBackground>
	)
}

export default Modal;
export type {ModalProps};