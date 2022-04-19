import { ReactChild } from "react";
import styled from "styled-components";

const Container = styled.div`
  padding: 8px;
  border-radius: ${({ theme }) => theme.borderRadius.modalInner}px;
  display: flex;
  align-items: center;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.onPrimaryOverlay};
  }
`;

const IconWrapper = styled.span`
  margin-right: 12px;
`;

interface Props {
  icon?: ReactChild;
  label: string;
  onClick?: () => void;
}
export default function DropdownItem(props: Props) {
  return (
    <Container onClick={props.onClick}>
      {props.icon && <IconWrapper>{props.icon}</IconWrapper>}
      {props.label}
    </Container>
  );
}
