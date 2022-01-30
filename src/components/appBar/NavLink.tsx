import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled(Link)<{ expanded: boolean; matches: number }>`
  padding: 8px;
  margin: 4px 16px;
  min-width: ${({ expanded }) => (expanded ? "196px" : "0px")};
  transition: 0.5s;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-decoration: none;
  font-weight: bold;
  font-size: ${({ theme }) => `${theme.fontSize.navLink}pt`};
  color: ${({ matches, theme }) =>
    matches ? theme.color.onPrimary : theme.color.navLink};
  border-radius: ${({ theme }) => `${theme.borderRadius.navLink}px`};

  &:hover {
    color: ${({ matches, theme }) =>
      matches ? theme.color.onPrimary : theme.color.text};
    background-color: ${({ matches, theme }) =>
      matches ? "transparent" : theme.color.onPrimaryOverlay};
  }
`;

const IconWrapper = styled.div`
  width: 32px;
`;

const Label = styled.div<{ expanded: boolean }>`
  margin-left: 48px;
  opacity: ${({ expanded }) => (expanded ? 1 : 0)};
  transition: opacity 0.25s;
  transition-delay: ${({ expanded }) => (expanded ? "0.1s" : "0s")};
  transition-property: opacity;
  position: absolute;
  pointer-events: none;
`;

interface Props {
  children: ReactNode;
  to: string;
  expanded: boolean;
  label: string;
}
export default function NavLink(props: Props) {
  const location = useLocation();

  const matchesLocation = (path: string): number =>
    path === location.pathname ? 1 : 0;

  return (
    <Container
      to={props.to}
      expanded={props.expanded}
      matches={matchesLocation(props.to)}
    >
      <IconWrapper>{props.children}</IconWrapper>
      <Label expanded={props.expanded}>{props.label}</Label>
    </Container>
  );
}
