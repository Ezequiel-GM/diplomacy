import { Link } from "react-router-dom";
import { AnimationControls, motion } from "framer-motion";
import styled from "styled-components";
import { ReactComponent as LogoSvg } from "../../assets/images/diplomatic_logo.svg";

const AppBarShape = styled(motion.div)`
  z-index: 100;
  background-color: ${(props) => props.theme.color.onPrimary};
  box-shadow: ${(props) => props.theme.boxShadow.appBar};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: ${({ theme }) => theme.size.appBar};
  pointer-events: auto;
`;

const LogoContainer = styled(motion.div)<{ expanded: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-right: ${({ expanded }) => (expanded ? "32px" : "0")};
`;

const Logo = styled(LogoSvg)`
  margin-top: 8px;
  width: 180px;
  fill: ${(props) => props.theme.color.primary};
`;

const TopLinksContainer = styled(motion.div)`
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
    padding: ["0 32px 12px", "0 16px 0px"],
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

interface Props {
  shapeControls: AnimationControls;
  contentControls: AnimationControls;
  isExpanded: boolean;
}
export default function AppBar(props: Props) {
  return (
    <AppBarShape
      variants={appBarVariants}
      initial="initial"
      animate={props.shapeControls}
    >
      <LogoContainer
        variants={logoVariants}
        initial="initial"
        animate={props.contentControls}
        expanded={props.isExpanded}
      >
        <Link to="/games">
          <Logo />
        </Link>
      </LogoContainer>
      {props.isExpanded && (
        <TopLinksContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75 }}
        ></TopLinksContainer>
      )}
      {props.isExpanded && (
        <ProfileContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75 }}
        >
          profile
        </ProfileContainer>
      )}
    </AppBarShape>
  );
}
