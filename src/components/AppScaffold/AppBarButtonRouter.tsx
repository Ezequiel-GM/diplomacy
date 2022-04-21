import { Route, Routes } from "react-router-dom";
import GamesButtons from "../../pages/Games/AppBarButtons";
import SandboxButtons from "../../pages/Sandboxes/AppBarButtons";

export default function AppBarButtonRouter() {
  return (
    <Routes>
      <Route path="/games" element={<GamesButtons />} />
      <Route path="/sandboxes" element={<SandboxButtons />} />
      <Route path="*" element={null} />
    </Routes>
  );
}
