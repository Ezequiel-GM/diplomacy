import { User } from "firebase/auth";
import { useAnimation } from "framer-motion";
import { PropsWithChildren, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import AppBar from "./appScaffold/AppBar";
import Sidebar from "./appScaffold/Sidebar";

const Scaffold = styled.div<{ user: User }>`
  height: auto;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  background-color: ${({ theme, user }) =>
    user ? theme.color.card : theme.color.primary};
  transition: background-color 1s;
`;

const AppBarContainer = styled.header`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const SidebarOverlay = styled.div<{ sidebarOpened: boolean }>`
  z-index: 50;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: black;
  pointer-events: ${({ sidebarOpened }) => (sidebarOpened ? "auto" : "none")};
  opacity: ${({ sidebarOpened }) => (sidebarOpened ? 0.1 : 0)};
  transition: opacity 0.5s;
`;

const PageContent = styled.main`
  flex-grow: 1;
  min-height: 600px;
`;

export default function AppScaffold(props: PropsWithChildren<{}>) {
  const [user, loading] = useAuthState(auth);
  const appBarShapeControls = useAnimation();
  const appBarContentControls = useAnimation();
  const sidebarControls = useAnimation();
  const [isCentered, setIsCentered] = useState(false);
  const [isAppBarExpanded, setIsAppBarExpanded] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isSidebarOpened, setIsSidebarOpened] = useState(false);

  useEffect(() => {
    appBarShapeControls.start("center").then(() => setIsCentered(true));
  }, [appBarShapeControls]);

  useEffect(() => {
    async function expandAppBar() {
      await appBarShapeControls.start("fullWidth");
      sidebarControls.start("loaded");
      await appBarContentControls.start("expand");
      setIsAppBarExpanded(true);
    }
    async function collapseAppBar() {
      await appBarShapeControls.start("hidden");
      setIsAppBarExpanded(false);
      await appBarContentControls.start("initial");
      await appBarShapeControls.start("initial");
      appBarShapeControls.start("center");
    }

    if (user && !loading) {
      if (isCentered && !isAppBarExpanded) expandAppBar();
    } else {
      if (isAppBarExpanded) collapseAppBar();
    }
  }, [
    appBarShapeControls,
    appBarContentControls,
    sidebarControls,
    isAppBarExpanded,
    isCentered,
    user,
    loading,
  ]);

  useEffect(() => {
    if (user) {
      setTimeout(() => setIsSidebarVisible(true), 500);
    } else {
      sidebarControls.start("initial").then(() => setIsSidebarVisible(false));
    }
  }, [user, setIsSidebarVisible]);

  return (
    <Scaffold user={user}>
      <AppBarContainer>
        <AppBar
          shapeControls={appBarShapeControls}
          contentControls={appBarContentControls}
          isExpanded={isAppBarExpanded}
          onToggleSidebar={() => setIsSidebarOpened((open) => !open)}
        />
      </AppBarContainer>
      {isSidebarVisible && (
        <Sidebar controls={sidebarControls} isOpened={isSidebarOpened} />
      )}
      <SidebarOverlay
        sidebarOpened={isSidebarOpened}
        onClick={() => setIsSidebarOpened(false)}
      />
      <PageContent>{props.children}</PageContent>
    </Scaffold>
  );
}
