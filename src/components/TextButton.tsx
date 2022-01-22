import { ReactNode } from "react";
import styled from "styled-components";

const Button = styled.button<{ width?: string }>`
  width: ${(props) => (props.width ? props.width : "")};
  background-color: ${(props) => props.theme.color.primary};
  color: ${(props) => props.theme.color.onPrimary};
  font-size: ${(props) => `${props.theme.fontSize.but}pt`};
  border: none;
  border-radius: ${(props) => `${props.theme.borderRadius.button}px`};
  padding: 0;

  transition: transform 0.2s;
  &:active {
    transform: translateY(2px);
  }

  &:hover {
    cursor: pointer;
  }
`;

const Overlay = styled.div`
  padding: ${(props) => `${props.theme.padding.button}px`};
  border-radius: ${(props) => `${props.theme.borderRadius.button}px`};

  background-color: rgba(255, 255, 255, 0);
  transition: background-color 0.2s;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

interface Props {
  onClick?: () => void;
  children?: ReactNode;
  width?: string;
  type?: "button" | "submit" | "reset" | undefined;
}
export default function TextButton(props: Props) {
  return (
    <Button width={props.width} type={props.type} onClick={props.onClick}>
      <Overlay>{props.children}</Overlay>
    </Button>
  );
}
