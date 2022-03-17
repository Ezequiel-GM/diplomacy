import { PropsWithChildren } from "react";
import ReactModal from "react-modal";
import theme from "../theme.json";

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
  },
};

interface Props {
  isOpen: boolean;
  onRequestClose: () => void;
}
export default function ModalDialog(props: PropsWithChildren<Props>) {
  return (
    <ReactModal
      style={modalStyles}
      isOpen={props.isOpen}
      onRequestClose={props.onRequestClose}
    >
      {props.children}
    </ReactModal>
  );
}
