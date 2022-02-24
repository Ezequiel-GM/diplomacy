import { User } from "firebase/auth";
import { useAnimation } from "framer-motion";
import { PropsWithChildren, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";
import AppBar from "./appScaffold/AppBar";
import Sidebar from "./appScaffold/Sidebar";

const Scaffold = styled.div<{ user: User }>`
  height: 100%;
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

const PageContent = styled.main<{
  appBarExpanded: boolean;
  sidebarExpanded: boolean;
}>`
  height: 100%;
  flex-grow: 1;
`;

export default function AppScaffold(props: PropsWithChildren<{}>) {
  const [user, loading] = useAuthState(auth);
  const appBarShapeControls = useAnimation();
  const appBarContentControls = useAnimation();
  const sidebarControls = useAnimation();
  const [isCentered, setIsCentered] = useState(false);
  const [isAppBarExpanded, setIsAppBarExpanded] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);

  useEffect(() => {
    appBarShapeControls.start("center").then(() => setIsCentered(true));
  }, [appBarShapeControls]);

  useEffect(() => {
    async function expandAppBar() {
      await appBarShapeControls.start("fullWidth");
      sidebarControls.start("visible");
      await appBarContentControls.start("expand");
      setIsAppBarExpanded(true);
    }

    if (isCentered && user && !loading) {
      expandAppBar();
    }
  }, [
    appBarShapeControls,
    appBarContentControls,
    sidebarControls,
    isCentered,
    user,
    loading,
  ]);

  useEffect(() => {
    console.log("hey");
    if (user) {
      setTimeout(() => setIsSidebarVisible(true), 500);
    }
  }, [user, setIsSidebarVisible]);

  return (
    <Scaffold user={user}>
      <AppBarContainer>
        <AppBar
          shapeControls={appBarShapeControls}
          contentControls={appBarContentControls}
          isExpanded={isAppBarExpanded}
        />
      </AppBarContainer>
      {isSidebarVisible && (
        <Sidebar
          controls={sidebarControls}
          onChangeExpanded={(expanded) => setIsSidebarExpanded(expanded)}
        />
      )}
      <PageContent
        appBarExpanded={isAppBarExpanded}
        sidebarExpanded={isSidebarExpanded}
      >
        {props.children}
      </PageContent>
    </Scaffold>
  );
}
