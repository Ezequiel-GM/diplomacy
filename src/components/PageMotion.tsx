import { User } from "firebase/auth";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";

const Motion = styled(motion.div)<{ sideBarExpanded: boolean; user: User }>`
  padding-left: ${({ sideBarExpanded, theme, user }) =>
    !user
      ? 0
      : sideBarExpanded
      ? theme.size.sideBar
      : theme.size.sideBarCollapsed};
  padding-top: ${({ theme, user }) => (!user ? 0 : theme.size.appBar)};
  height: ${({ theme, user }) =>
    !user ? "100%" : `calc(100% - ${theme.size.appBar})`};
  background-color: ${({ theme }) => theme.color.card};

  transition-delay: 0.5s;
  transition-property: padding-left, padding-top, height;
`;

const visibilityVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      delayChildren: 0.5,
    },
  },
};

interface Props {
  children?: ReactNode;
  sideBarExpanded: boolean;
}
export default function PageMotion(props: Props) {
  const [user] = useAuthState(auth);

  return (
    <Motion
      variants={visibilityVariants}
      initial="hidden"
      animate="visible"
      sideBarExpanded={props.sideBarExpanded}
      user={user}
    >
      {props.children}
    </Motion>
  );
}
