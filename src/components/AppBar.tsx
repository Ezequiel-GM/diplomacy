import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as LogoSvg } from "../assets/images/diplomatic_logo.svg";
import { auth } from "../firebase";

const Container = styled.header`
  position: absolute;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  z-index: 100;
`;

const BarShape = styled(motion.div)`
  background-color: ${(props) => props.theme.color.onPrimary};
  box-shadow: ${(props) => props.theme.boxShadow.appBar};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LogoContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
`;

const Logo = styled(LogoSvg)`
  margin-top: 6px;
  height: 40px;
  fill: ${(props) => props.theme.color.primary};
`;

const appBarVariants = {
  initial: {
    y: -100,
    borderRadius: "0 0 100% 100%",
    flexGrow: 0.0001,
    padding: "12px 32px 24px",
  },
  center: {
    y: 0,
    borderRadius: "0 0 100% 100%",
    flexGrow: 0.0001,
    padding: "12px 32px 24px",
    transition: {
      type: "easeIn",
      duration: 0.75,
    },
  },
  fullWidth: {
    y: 0,
    borderRadius: ["0 0 100% 100%", "0 0 0% 0%"],
    flexGrow: [0.001, 1],
    padding: ["12px 32px 24px", "12px 32px 12px"],
    transition: {
      type: "linear",
      duration: 0.75,
    },
  },
};

const logoVariants = {
  initial: {
    minWidth: "100%",
  },
  alignLeft: {
    minWidth: "0%",
    transition: {
      type: "linear",
      duration: 0.75,
    },
  },
};

export default function AppBar() {
  const [user, loading] = useAuthState(auth);
  const appBarControls = useAnimation();
  const logoControls = useAnimation();
  const [isCentered, setIsCentered] = useState(false);

  useEffect(() => {
    appBarControls.start("center").then(() => setIsCentered(true));
  }, [appBarControls]);

  useEffect(() => {
    if (isCentered && user && !loading) {
      appBarControls
        .start("fullWidth")
        .then(() => logoControls.start("alignLeft"));
    }
  }, [appBarControls, logoControls, isCentered, user, loading]);

  return (
    <Container>
      <BarShape
        variants={appBarVariants}
        initial="initial"
        animate={appBarControls}
      >
        <LogoContainer
          variants={logoVariants}
          initial="initial"
          animate={logoControls}
        >
          <Link to="/games">
            <Logo />
          </Link>
        </LogoContainer>
      </BarShape>
    </Container>
  );
}
