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

const RoutesContainer = styled.div`
  height: 100%;
`;

export default function AppRoutes() {
  const location = useLocation();

  return (
    <RoutesContainer>
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
    </RoutesContainer>
  );
}

const TopPadding = styled.div`
  padding-top: ${({ theme }) => theme.size.appBar};
`;
function AuthenticatedRoute(props: PropsWithChildren<{}>): JSX.Element {
  const [user, loading] = useAuthState(auth);

  return (
    <AnimatePresence exitBeforeEnter>
      {loading && (
        <PageRoute key="loading">
          <Loading />
        </PageRoute>
      )}
      {user && (
        <PageRoute key="authenticated">
          <TopPadding>{props.children}</TopPadding>
        </PageRoute>
      )}
      {!user && !loading && (
        <PageRoute key="login">
          <Login />
        </PageRoute>
      )}
    </AnimatePresence>
  );
}

const Transition = styled(motion.div)`
  height: 100%;
`;
function PageRoute(props: PropsWithChildren<{}>): JSX.Element {
  return (
    <Transition exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <PageMotion>{props.children}</PageMotion>
    </Transition>
  );
}
