import { Link } from "react-router-dom";
import { AnimationControls, motion } from "framer-motion";
import styled from "styled-components";
import { ReactComponent as LogoSvg } from "../../assets/images/diplomatic_logo.svg";
import {
  LogOut,
  Menu,
  PersonCircle,
  Settings,
} from "@styled-icons/ionicons-outline";
import { useScreenSize } from "../../hooks/media";
import DropdownMenu from "../DropdownMenu";
import DropdownAction from "../DropdownAction";
import { auth } from "../../firebase";
import DropdownLink from "../DropdownLink";

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

const LeftContainer = styled.div`
  flex-grow: 1;
  display: flex;
  align-items: center;
`;

const MenuButton = styled(motion.button)`
  height: 32px;
  padding: 0;
  border: none;
  border-radius: 100%;
  background-color: transparent;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme }) => theme.color.text};
`;

const MenuIcon = styled(Menu)`
  width: 100%;
  height: 100%;
`;

const LogoContainer = styled(motion.div)<{ expanded: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Logo = styled(LogoSvg)`
  margin-top: 8px;
  width: 140px;
  fill: ${(props) => props.theme.color.primary};

  @media (min-width: 768px) {
    width: 180px;
  }
`;

const ProfileContainer = styled(motion.div)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;

const ProfileIcon = styled(PersonCircle)`
  width: 32px;
  height: 32px;
`;

const SettingsIcon = styled(Settings)`
  width: 28px;
  height: 28px;
`;

const LogOutIcon = styled(LogOut)`
  width: 28px;
  height: 28px;
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
  hidden: {
    y: -100,
    transition: {
      type: "easeOut",
      duration: 0.75,
    },
  },
};

const menuButtonVariants = {
  initial: {
    width: "0px",
    marginRight: "0px",
  },
  visible: {
    width: "32px",
    marginRight: "16px",
    transition: {
      type: "easeIn",
      duration: 0.75,
    },
  },
};

const logoVariants = {
  initial: {
    flexGrow: 1,
    transition: {
      type: "easeIn",
      duration: 0.75,
    },
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
  onToggleSidebar: () => void;
}
export default function AppBar(props: Props) {
  const isSmall = useScreenSize("small");

  return (
    <AppBarShape
      variants={appBarVariants}
      initial="initial"
      animate={props.shapeControls}
    >
      <LeftContainer>
        {isSmall && props.isExpanded && (
          <MenuButton
            onClick={() => props.onToggleSidebar()}
            variants={menuButtonVariants}
            initial="initial"
            animate="visible"
          >
            <MenuIcon />
          </MenuButton>
        )}
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
      </LeftContainer>

      {props.isExpanded && (
        <ProfileContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75 }}
        >
          <DropdownMenu button={<ProfileIcon />}>
            <DropdownLink
              icon={<SettingsIcon />}
              label="Settings"
              to="/settings"
            />
            <DropdownAction
              icon={<LogOutIcon />}
              label="Sign Out"
              onClick={() => auth.signOut()}
            />
          </DropdownMenu>
        </ProfileContainer>
      )}
    </AppBarShape>
  );
}
