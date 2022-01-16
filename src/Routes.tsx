import { AnimatePresence } from "framer-motion";
import {
  Navigate,
  useLocation,
  Routes as ReactRoutes,
  Route,
} from "react-router-dom";
import Game from "./pages/Game";
import Games from "./pages/Games";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

export default function Routes() {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <ReactRoutes location={location} key={location.pathname}>
        <Route path="/" element={<Navigate replace to="/games" />} />
        <Route path="/games" element={<Games />} />
        <Route path="/login" element={<Login />} />
        <Route path="/game/:gameId" element={<Game />} />
        <Route element={<NotFound />} />
      </ReactRoutes>
    </AnimatePresence>
  );
}
