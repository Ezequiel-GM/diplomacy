import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import styled from "styled-components";
import PageMotion from "./components/PageMotion";
import { auth } from "./firebase";
import Game from "./pages/Game";
import Games from "./pages/Games";
import Loading from "./pages/Loading";
import Login from "./pages/Login";
import Maps from "./pages/Maps";
import NotFound from "./pages/NotFound";

const RoutesBackground = styled.div<{ authenticated: boolean }>`
  height: 100%;
  background-color: ${({ authenticated, theme }) =>
    authenticated ? theme.color.card : theme.color.primary};
  transition: background-color 1s;
`;

interface Props {
  sideBarExpanded: boolean;
}
export default function AppRoutes(props: Props) {
  const location = useLocation();
  const [user, loading] = useAuthState(auth);

  return (
    <RoutesBackground authenticated={!loading && user}>
      <AnimatePresence exitBeforeEnter>
        <Routes location={location}>
          <Route path="/" element={<Navigate replace to="/games" />} />
          <Route
            path="/games"
            element={
              <AuthenticatedRoute sideBarExpanded={props.sideBarExpanded}>
                <Games />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/game/:gameId"
            element={
              <AuthenticatedRoute sideBarExpanded={props.sideBarExpanded}>
                <Game />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/maps"
            element={
              <AuthenticatedRoute sideBarExpanded={props.sideBarExpanded}>
                <Maps />
              </AuthenticatedRoute>
            }
          />
          <Route element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </RoutesBackground>
  );
}

function AuthenticatedRoute(
  props: PropsWithChildren<{ sideBarExpanded: boolean }>
): JSX.Element {
  const [user, loading] = useAuthState(auth);

  return (
    <AnimatePresence exitBeforeEnter>
      {loading && (
        <PageRoute key="loading" sideBarExpanded={props.sideBarExpanded}>
          <Loading />
        </PageRoute>
      )}
      {user && !loading && (
        <PageRoute key="authenticated" sideBarExpanded={props.sideBarExpanded}>
          {props.children}
        </PageRoute>
      )}
      {!user && !loading && (
        <PageRoute key="login" sideBarExpanded={props.sideBarExpanded}>
          <Login />
        </PageRoute>
      )}
    </AnimatePresence>
  );
}

function PageRoute(
  props: PropsWithChildren<{ sideBarExpanded: boolean }>
): JSX.Element {
  const Transition = styled(motion.div)`
    height: 100%;
  `;

  return (
    <Transition exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <PageMotion sideBarExpanded={props.sideBarExpanded}>
        {props.children}
      </PageMotion>
    </Transition>
  );
}
