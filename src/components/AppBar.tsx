import { motion } from "framer-motion";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as LogoSvg } from "../assets/images/diplomatic_logo.svg";
import { auth } from "../firebase";

const Container = styled(motion.div)`
  box-shadow: ${(props) => props.theme.boxShadow.appBar};
  z-index: 1;
  padding: 12px 32px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Wrapper = styled.header<{ displayNav: boolean }>`
  flex-grow: ${(props) => (props.displayNav ? 1 : 0)};
  transition: flex-grow 1s;
  max-width: 1600px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(LogoSvg)`
  margin-top: 8px;
  height: 40px;
  fill: ${(props) => props.theme.color.onPrimary};
`;

export default function AppBar() {
  const [user, loading] = useAuthState(auth);

  return (
    <Container
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Wrapper displayNav={user && !loading}>
        <Link to="/">
          <Logo />
        </Link>
      </Wrapper>
    </Container>
  );
}
