import { motion } from "framer-motion";
import { PropsWithChildren } from "react";
import styled from "styled-components";

const Motion = styled(motion.div)`
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
  return (
    <Motion variants={visibilityVariants} initial="hidden" animate="visible">
      {props.children}
    </Motion>
  );
}
