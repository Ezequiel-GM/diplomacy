import { ReactChild } from "react";
import styled from "styled-components";
import { useScreenSize } from "../../hooks/media";

const Container = styled.button<{ isSmall: boolean }>`
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.button}px;
  margin-right: ${({ isSmall }) => (isSmall ? "4px" : "8px")};
  padding: ${({ isSmall }) => (isSmall ? "4px" : "8px")};
  background-color: transparent;
  display: flex;
  flex-direction: row;
  align-items: center;
  cursor: pointer;
  color: ${({ theme }) => theme.color.textLight};

  &:hover {
    color: ${({ theme }) => theme.color.text};
    background-color: ${({ theme }) => theme.color.onPrimaryOverlay};
  }
  transition: color 0.5s, background-color 0.5s;
`;

const Label = styled.span`
  margin: 0 4px 0;
  font-size: ${({ theme }) => theme.fontSize.appBarButton}pt;
  font-weight: bold;
`;

interface Props {
  icon: ReactChild;
  label: string;
  onClick: () => void;
}
export default function AppBarButton(props: Props) {
  const isSmall = useScreenSize("small");

  return (
    <Container isSmall={isSmall} onClick={props.onClick}>
      {props.icon}
      {!isSmall && <Label>{props.label}</Label>}
    </Container>
  );
}
