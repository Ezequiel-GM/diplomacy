import { AnimatePresence, motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import styled from "styled-components";
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

export default function AppRoutes() {
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
              <AuthenticatedRoute>
                <Games />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/game/:gameId"
            element={
              <AuthenticatedRoute>
                <Game />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/maps"
            element={
              <AuthenticatedRoute>
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

function AuthenticatedRoute(props: PropsWithChildren<{}>): JSX.Element {
  const [user, loading] = useAuthState(auth);

  return (
    <AnimatePresence exitBeforeEnter>
      {loading && (
        <PageExitTransition key="loading">
          <Loading />
        </PageExitTransition>
      )}
      {user && !loading && (
        <PageExitTransition key="authenticated">
          {props.children}
        </PageExitTransition>
      )}
      {!user && !loading && (
        <PageExitTransition key="login">
          <Login />
        </PageExitTransition>
      )}
    </AnimatePresence>
  );
}

const Transition = styled(motion.div)`
  height: 100%;
`;
function PageExitTransition(props: PropsWithChildren<{}>): JSX.Element {
  return (
    <Transition exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      {props.children}
    </Transition>
  );
}
