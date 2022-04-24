import { ReactChild } from "react";
import styled from "styled-components";

const Button = styled.button<{ disabled?: boolean }>`
  border: none;
  border-radius: 100%;
  padding: 4px;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${({ disabled }) => (disabled ? "auto" : "pointer")};
  color: ${({ theme }) => theme.color.textLight};

  &:hover {
    color: ${({ disabled, theme }) =>
      disabled ? theme.color.textLight : theme.color.text};
    background-color: ${({ disabled, theme }) =>
      disabled ? "transparent" : theme.color.onPrimaryOverlay};
  }
  transition: color 0.5s, background-color 0.5s;

  &:active {
    transform: ${({ disabled }) => (disabled ? "none" : "translateY(2px)")};
  }
  transition: transform 0.2s;
`;

const Icon = styled.div`
  width: ${({ theme }) => theme.size.icon.small};
  height: ${({ theme }) => theme.size.icon.small};
`;

interface Props {
  disabled?: boolean;
  icon: ReactChild;
  onClick: () => void;
}
export default function IconButton(props: Props) {
  return (
    <Button disabled={props.disabled} onClick={props.onClick}>
      <Icon>{props.icon}</Icon>
    </Button>
  );
}
