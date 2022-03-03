import { User } from "firebase/auth";
import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth } from "../firebase";

const Motion = styled(motion.div)<{ authenticated: User }>`
  height: 100%;
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
      authenticated={user}
    >
      {props.children}
    </Motion>
  );
}
