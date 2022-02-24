import {
  ChevronBack,
  ChevronForward,
  Cube,
  GameController,
  Map,
} from "@styled-icons/ionicons-outline";
import { AnimationControls, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import NavLink from "./NavLink";
import NavLinkBackground from "./NavLinkBackground";

const SidebarShape = styled(motion.div)`
  position: relative;
  z-index: 100;
  margin-top: ${({ theme }) => theme.size.appBar};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${(props) => props.theme.color.onPrimary};
  box-shadow: ${(props) => props.theme.boxShadow.sideBar};
  pointer-events: auto;
`;

const SidebarContent = styled.div`
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

const sidebarVariants = {
  initial: {
    x: -244,
  },
  visible: {
    x: 0,
    transition: {
      type: "easeIn",
      duration: 0.5,
      delay: 0.25,
    },
  },
};

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

interface Props {
  controls: AnimationControls;
  onChangeExpanded: (expanded: boolean) => void;
}
export default function Sidebar(props: Props) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpanded = () => {
    props.onChangeExpanded(!isExpanded);
    setIsExpanded(!isExpanded);
  };

  return (
    <SidebarShape
      variants={sidebarVariants}
      initial="initial"
      animate={props.controls}
    >
      <SidebarContent>
        <NavLinksContainer>
          <NavLinkBackground paths={routes.map((route) => route.path)} />
          {routes.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              label={route.name}
              expanded={isExpanded}
            >
              {route.icon}
            </NavLink>
          ))}
        </NavLinksContainer>
        <ToggleButton onClick={() => toggleExpanded()}>
          {isExpanded ? <ChevronBack /> : <ChevronForward />}
        </ToggleButton>
      </SidebarContent>
    </SidebarShape>
  );
}
