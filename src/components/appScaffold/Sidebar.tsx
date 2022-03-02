import {
  ChevronBack,
  ChevronForward,
  Cube,
  GameController,
  Map,
} from "@styled-icons/ionicons-outline";
import { AnimationControls, motion } from "framer-motion";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useScreenSize } from "../../hooks/media";
import NavLink from "./NavLink";
import NavLinkBackground from "./NavLinkBackground";

const SidebarShape = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 100;
  margin-top: ${({ theme }) => theme.size.appBar};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background-color: ${(props) => props.theme.color.onPrimary};
  box-shadow: ${(props) => props.theme.boxShadow.sideBar};
  pointer-events: auto;

  @media (min-width: 768px) {
    position: relative;
  }
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

const smallSidebarVariants = {
  initial: {
    x: -244,
  },
  loaded: {
    x: -244,
    transition: {
      type: "easeIn",
      duration: 0.5,
    },
  },
  opened: {
    x: 0,
    transition: {
      type: "easeIn",
      duration: 0.5,
    },
  },
};

const mediumSidebarVariants = {
  initial: {
    x: -244,
  },
  loaded: {
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
  isOpened: boolean;
}
export default function Sidebar(props: Props) {
  const [isExpanded, setIsExpanded] = useState(true);
  const isMedium = useScreenSize("medium");

  useEffect(() => {
    props.controls.start("loaded").then(() => setIsExpanded(true));
  }, [props.controls, setIsExpanded, isMedium]);

  useEffect(() => {
    props.controls.start(props.isOpened ? "opened" : "loaded");
  }, [props.controls, props.isOpened]);

  return (
    <SidebarShape
      variants={isMedium ? mediumSidebarVariants : smallSidebarVariants}
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
        {isMedium && (
          <ToggleButton onClick={() => setIsExpanded((e) => !e)}>
            {isExpanded ? <ChevronBack /> : <ChevronForward />}
          </ToggleButton>
        )}
      </SidebarContent>
    </SidebarShape>
  );
}
