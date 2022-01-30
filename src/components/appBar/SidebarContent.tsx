import {
  ChevronBack,
  ChevronForward,
  Cube,
  GameController,
  Map,
} from "@styled-icons/ionicons-outline";
import { useState } from "react";
import styled from "styled-components";
import NavLink from "./NavLink";
import NavLinkBackground from "./NavLinkBackground";

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

const routes = [
  {
    name: "Games",
    path: "/games",
    icon: <GameController />,
  },
  {
    name: "Sandboxes",
    path: "/sandboxes",
    icon: <Cube />,
  },
  {
    name: "Maps",
    path: "/maps",
    icon: <Map />,
  },
];

export default function SidebarContent() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <Container>
      <NavLinksContainer>
        <NavLinkBackground paths={routes.map((route) => route.path)} />
        {routes.map((route) => (
          <NavLink to={route.path} label={route.name} expanded={isExpanded}>
            {route.icon}
          </NavLink>
        ))}
      </NavLinksContainer>
      <ToggleButton onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? <ChevronBack /> : <ChevronForward />}
      </ToggleButton>
    </Container>
  );
}
