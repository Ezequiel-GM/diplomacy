import { AddCircle } from "@styled-icons/ionicons-outline";
import { useState } from "react";
import styled from "styled-components";
import AppBarButton from "../../components/AppBarButton";
import CreateSandboxDialog from "./CreateSandboxDialog";

const CreateSandboxIcon = styled(AddCircle)`
  width: ${({ theme }) => theme.size.icon.small};
  height: ${({ theme }) => theme.size.icon.small};
`;

export default function AppBarButtons() {
  const [createSandboxOpen, setCreateSandboxOpen] = useState(false);

  return (
    <>
      <AppBarButton
        icon={<CreateSandboxIcon />}
        label="Create Sandbox"
        onClick={() => setCreateSandboxOpen(true)}
      />
      <CreateSandboxDialog
        isOpen={createSandboxOpen}
        onRequestClose={() => setCreateSandboxOpen(false)}
      />
    </>
  );
}
