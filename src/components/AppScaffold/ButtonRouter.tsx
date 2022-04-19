import { AddCircle, Enter } from "@styled-icons/ionicons-outline";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import AppBarButton from "../AppBarButton";
import SandboxButtons from "../../pages/Sandboxes/AppBarButtons";

const CreateGameIcon = styled(AddCircle)`
  width: ${({ theme }) => theme.size.icon.small};
  height: ${({ theme }) => theme.size.icon.small};
`;

const JoinGameIcon = styled(Enter)`
  width: ${({ theme }) => theme.size.icon.small};
  height: ${({ theme }) => theme.size.icon.small};
`;

export default function ButtonRouter() {
  return (
    <>
      <Routes>
        <Route
          path="/games"
          element={
            <>
              <AppBarButton
                icon={<CreateGameIcon />}
                label="Create Game"
                onClick={() => {}}
              />
              <AppBarButton
                icon={<JoinGameIcon />}
                label="Join Game"
                onClick={() => {}}
              />
            </>
          }
        />
        <Route path="/sandboxes" element={<SandboxButtons />} />
        <Route path="*" element={null} />
      </Routes>
    </>
  );
}
