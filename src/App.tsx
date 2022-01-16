import { AnimatePresence, motion } from "framer-motion";
import { ReactChild } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import styled from "styled-components";
import { auth } from "./firebase";

import Error from "./pages/Error";
import Game from "./pages/Game";
import Games from "./pages/Games";
import Loading from "./pages/Loading";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

const AppBackground = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.color.appBackground};
`;

const FullPage = styled(motion.div)`
  height: 100%;
`;

export default function App() {
  return (
    <AppBackground>
      <BrowserRouter>
        <CustomRoutes>
          <Route path="/" element={<Navigate replace to="/games" />} />
          <Route
            path="/games"
            element={
              <RequireAuth>
                <Games />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/game/:gameId"
            element={
              <RequireAuth>
                <Game />
              </RequireAuth>
            }
          />
          <Route element={<NotFound />} />
        </CustomRoutes>
      </BrowserRouter>
    </AppBackground>
  );
}

function CustomRoutes(props: {
  children: ReactChild | ReactChild[];
}): JSX.Element {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        {props.children}
      </Routes>
    </AnimatePresence>
  );
}

function RequireAuth(props: { children: ReactChild }): JSX.Element {
  const [user, loading, error] = useAuthState(auth);

  return (
    <AnimatePresence exitBeforeEnter>
      {error && <Error error={error} />}
      {loading && (
        <FullPage key="loading" exit={{ opacity: [1, 0] }} initial={false}>
          <Loading />
        </FullPage>
      )}
      {user && props.children}
      {!user && !loading && <Navigate replace to="/login" />}
    </AnimatePresence>
  );
}
