import { PropsWithChildren } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import theme from "../../theme.json";
import Heading2 from "../Heading2";
import IconButton from "../IconButton";
import { Close } from "@styled-icons/ionicons-outline";

const modalStyles: ReactModal.Styles = {
  overlay: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 200,
    backgroundColor: theme.color.modalOverlay,
  },
  content: {
    position: "static",
    border: "none",
    borderRadius: theme.borderRadius.modal,
    boxShadow: theme.boxShadow.modal,
    padding: "16px 20px",
  },
};

const TopBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;

interface Props {
  disableClose?: boolean;
  isOpen: boolean;
  onRequestClose: () => void;
  title?: string;
}
export default function ModalDialog(props: PropsWithChildren<Props>) {
  return (
    <ReactModal
      style={modalStyles}
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
    >
      <TopBar>
        <Heading2>{props.title}</Heading2>
        <IconButton
          disabled={props.disableClose}
          icon={<Close />}
          onClick={props.onRequestClose}
        />
      </TopBar>
      {props.children}
    </ReactModal>
  );
}
