import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import AppRoutes from "./AppRoutes";
import AppBar from "./components/AppBar";

const AppContainer = styled.div`
  height: 100%;
`;

export default function App() {
  return (
    <AppContainer>
      <BrowserRouter>
        <AppBar />
        <AppRoutes />
      </BrowserRouter>
    </AppContainer>
  );
}
