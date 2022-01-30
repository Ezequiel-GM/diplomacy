import {
  ChevronBack,
  ChevronForward,
  Cube,
  GameController,
  Map,
} from "@styled-icons/ionicons-outline";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: end;
`;

const NavLinksContainer = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 8px 0;
  transition: 0.5s;
`;

const NavLink = styled(Link)<{ expanded: boolean; matches: number }>`
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
  background-color: ${({ matches, theme }) =>
    matches ? theme.color.primary : "transparent"};
  border-radius: ${({ theme }) => `${theme.borderRadius.navLink}px`};

  &:hover {
    color: ${({ matches, theme }) =>
      matches ? theme.color.onPrimary : theme.color.text};
    background-color: ${({ matches, theme }) =>
      matches ? theme.color.primary : theme.color.onPrimaryOverlay};
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
`;

const ToggleButton = styled.button`
  width: 44px;
  padding: 8px;
  margin: 8px 16px;
  border: none;
  border-radius: 100%;
  color: ${({ theme }) => theme.color.navLink};
  background-color: rgba(0, 0, 0, 0);

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.color.text};
    background-color: ${({ theme }) => theme.color.onPrimaryOverlay};
  }
`;

export default function SidebarContent() {
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(true);

  const matches = (path: string): number =>
    path === location.pathname ? 1 : 0;

  return (
    <Container>
      <NavLinksContainer>
        <NavLink to="/games" expanded={isExpanded} matches={matches("/games")}>
          <IconWrapper>
            <GameController />
          </IconWrapper>
          <Label expanded={isExpanded}>Games</Label>
        </NavLink>
        <NavLink
          to="/sandboxes"
          expanded={isExpanded}
          matches={matches("/sandboxes")}
        >
          <IconWrapper>
            <Cube />
          </IconWrapper>
          <Label expanded={isExpanded}>Sandboxes</Label>
        </NavLink>
        <NavLink to="/maps" expanded={isExpanded} matches={matches("/maps")}>
          <IconWrapper>
            <Map />
          </IconWrapper>
          <Label expanded={isExpanded}>Maps</Label>
        </NavLink>
      </NavLinksContainer>
      <ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? <ChevronBack /> : <ChevronForward />}
      </ToggleButton>
    </Container>
  );
}
