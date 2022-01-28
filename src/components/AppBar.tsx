import { motion, useAnimation } from "framer-motion";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as LogoSvg } from "../assets/images/diplomatic_logo.svg";
import { auth } from "../firebase";
import NavLinks from "./appBar/NavLinks";

const Container = styled.div`
  z-index: 100;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  pointer-events: none;
`;

const AppBarContainer = styled.header`
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const AppBarShape = styled(motion.div)`
  background-color: ${(props) => props.theme.color.onPrimary};
  box-shadow: ${(props) => props.theme.boxShadow.appBar};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 64px;
  pointer-events: auto;
`;

const LogoContainer = styled(motion.div)<{ expanded: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 180px;
  margin-right: ${({ expanded }) => (expanded ? "32px" : "0")};
`;

const Logo = styled(LogoSvg)`
  margin-top: 8px;
  fill: ${(props) => props.theme.color.primary};
`;

const NavContainer = styled(motion.nav)`
  height: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`;

const ProfileContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  width: 200px;
`;

const Sidebar = styled(motion.div)`
  position: absolute;
  z-index: 100;
  top: 64px;
  left: 0;
  bottom: 0;
  width: 244px;
  background-color: ${(props) => props.theme.color.onPrimary};
  box-shadow: ${(props) => props.theme.boxShadow.sideBar};
  pointer-events: auto;
`;

const appBarVariants = {
  initial: {
    y: -100,
    borderRadius: "0 0 100% 100%",
    flexGrow: 0.0001,
    padding: "0 32px 12px",
  },
  center: {
    y: 0,
    borderRadius: "0 0 100% 100%",
    flexGrow: 0.0001,
    padding: "0 32px 12px",
    transition: {
      type: "easeIn",
      duration: 0.75,
    },
  },
  fullWidth: {
    y: 0,
    borderRadius: ["0 0 100% 100%", "0 0 0% 0%"],
    flexGrow: [0.0001, 1],
    padding: ["0 32px 12px", "0 32px 0px"],
    transition: {
      type: "linear",
      duration: 0.75,
    },
  },
};

const logoVariants = {
  initial: {
    flexGrow: 1,
  },
  expand: {
    flexGrow: 0.001,
    transition: {
      type: "easeIn",
      duration: 0.75,
    },
  },
};

const sideBarVariants = {
  initial: {
    x: -244,
  },
  visible: {
    x: 0,
    transition: {
      type: "easeIn",
      duration: 0.5,
    },
  },
};

export default function AppBar() {
  const [user, loading] = useAuthState(auth);
  const appBarControls = useAnimation();
  const contentControls = useAnimation();
  const sideBarControls = useAnimation();
  const [isCentered, setIsCentered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    appBarControls.start("center").then(() => setIsCentered(true));
  }, [appBarControls]);

  useEffect(() => {
    async function expandAppBar() {
      await appBarControls.start("fullWidth");
      await contentControls.start("expand");
      setIsExpanded(true);
      await sideBarControls.start("visible");
    }

    if (isCentered && user && !loading) {
      expandAppBar();
    }
  }, [
    appBarControls,
    contentControls,
    sideBarControls,
    isCentered,
    user,
    loading,
  ]);

  return (
    <Container>
      <AppBarContainer>
        <AppBarShape
          variants={appBarVariants}
          initial="initial"
          animate={appBarControls}
        >
          <LogoContainer
            variants={logoVariants}
            initial="initial"
            animate={contentControls}
            expanded={isExpanded}
          >
            <Link to="/games">
              <Logo />
            </Link>
          </LogoContainer>
          {isExpanded && (
            <NavContainer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.75 }}
            >
              <NavLinks />
            </NavContainer>
          )}
          {isExpanded && (
            <ProfileContainer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25, duration: 0.75 }}
            >
              profile
            </ProfileContainer>
          )}
        </AppBarShape>
      </AppBarContainer>
      <Sidebar
        variants={sideBarVariants}
        initial="initial"
        animate={sideBarControls}
      ></Sidebar>
    </Container>
  );
}
