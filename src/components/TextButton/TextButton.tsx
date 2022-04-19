import { ReactNode } from "react";
import styled from "styled-components";

const Button = styled.button<{ width?: string; disabled?: boolean }>`
  width: ${(props) => (props.width ? props.width : "")};
  background-color: ${({ disabled, theme }) =>
    disabled ? theme.color.primaryDisabled : theme.color.primary};
  color: ${({ disabled, theme }) =>
    disabled ? theme.color.onPrimaryDisabled : theme.color.onPrimary};
  font-size: ${(props) => `${props.theme.fontSize.but}pt`};
  border: none;
  border-radius: ${(props) => `${props.theme.borderRadius.button}px`};
  padding: 0;

  transition: 0.2s;
  &:active {
    transform: ${({ disabled }) => (disabled ? "" : "translateY(2px)")};
  }

  &:hover {
    cursor: ${({ disabled }) => (disabled ? "" : "pointer")};
  }
`;

const Overlay = styled.div<{ disabled?: boolean }>`
  padding: ${(props) => `${props.theme.padding.button}px`};
  border-radius: ${(props) => `${props.theme.borderRadius.button}px`};

  background-color: rgba(255, 255, 255, 0);
  transition: background-color 0.2s;
  &:hover {
    background-color: ${({ disabled }) =>
      disabled ? "" : "rgba(255, 255, 255, 0.1)"};
  }
`;

interface Props {
  onClick?: () => void;
  children?: ReactNode;
  width?: string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
}
export default function TextButton(props: Props) {
  return (
    <Button
      width={props.width}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      <Overlay disabled={props.disabled}>{props.children}</Overlay>
    </Button>
  );
}
