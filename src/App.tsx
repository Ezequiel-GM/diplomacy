import ReactModal from "react-modal";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import AppRoutes from "./AppRoutes";
import AppScaffold from "./components/AppScaffold";

const AppContainer = styled.div`
  height: auto;
  min-height: 100vh;
`;

export default function App() {
  ReactModal.setAppElement("#root");

  return (
    <AppContainer>
      <BrowserRouter>
        <AppScaffold>
          <AppRoutes />
        </AppScaffold>
      </BrowserRouter>
    </AppContainer>
  );
}
