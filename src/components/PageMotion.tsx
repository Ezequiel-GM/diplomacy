import { User } from "firebase/auth";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";

const Motion = styled(motion.div)<{ user: User }>`
  background-color: ${({ theme, user }) =>
    user ? theme.color.card : theme.color.primary};
  height: 100%;

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

export default function PageMotion(props: PropsWithChildren<{}>) {
  const [user] = useAuthState(auth);

  return (
    <Motion
      variants={visibilityVariants}
      initial="hidden"
      animate="visible"
      user={user}
    >
      {props.children}
    </Motion>
  );
}
