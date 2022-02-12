import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import styled from "styled-components";
import AppRoutes from "./AppRoutes";
import AppBar from "./components/AppBar";

const AppContainer = styled.div`
  height: 100%;
`;

export default function App() {
  const [sideBarExpanded, setSideBarExpanded] = useState(true);

  return (
    <AppContainer>
      <BrowserRouter>
        <AppBar
          onChangeSideBarExpanded={(expanded) => setSideBarExpanded(expanded)}
        />
        <AppRoutes sideBarExpanded={sideBarExpanded} />
      </BrowserRouter>
    </AppContainer>
  );
}
