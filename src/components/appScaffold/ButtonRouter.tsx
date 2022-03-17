import { AddCircle, Enter } from "@styled-icons/ionicons-outline";
import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import AppBarButton from "./AppBarButton";

const CreateGameIcon = styled(AddCircle)`
  width: ${({ theme }) => theme.size.icon.small};
  height: ${({ theme }) => theme.size.icon.small};
`;

const JoinGameIcon = styled(Enter)`
  width: ${({ theme }) => theme.size.icon.small};
  height: ${({ theme }) => theme.size.icon.small};
`;

const CreateSandboxIcon = CreateGameIcon;

export default function ButtonRouter() {
  return (
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
      <Route
        path="/sandboxes"
        element={
          <>
            <AppBarButton
              icon={<CreateSandboxIcon />}
              label="Create Sandbox"
              onClick={() => {}}
            />
          </>
        }
      />
      <Route path="*" element={null} />
    </Routes>
  );
}
