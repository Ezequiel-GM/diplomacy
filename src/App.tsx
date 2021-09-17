import styled from 'styled-components';

import AuthRouter from "./AuthRouter";

const AppBackground = styled.div`
  height: 100%;
  background-color: ${({ theme }) => theme.color.appBackground};
`

export default function App() {
  return (
    <AppBackground>
      <AuthRouter />
    </AppBackground>
  )
}