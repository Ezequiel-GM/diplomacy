import { AddCircle, Enter } from "@styled-icons/ionicons-outline";
import styled from "styled-components";
import AppBarButton from "../../components/AppBarButton";

const CreateGameIcon = styled(AddCircle)`
  width: ${({ theme }) => theme.size.icon.small};
  height: ${({ theme }) => theme.size.icon.small};
`;

const JoinGameIcon = styled(Enter)`
  width: ${({ theme }) => theme.size.icon.small};
  height: ${({ theme }) => theme.size.icon.small};
`;

export default function AppBarButtons() {
  return (
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
  );
}
