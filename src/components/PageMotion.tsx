import { motion } from "framer-motion";
import { ReactNode } from "react";
import styled from "styled-components";

const Motion = styled(motion.div)`
  min-height: 100%;
  background-color: ${({ theme }) => theme.color.card};
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
}
export default function PageMotion(props: Props) {
  return (
    <Motion variants={visibilityVariants} initial="hidden" animate="visible">
      {props.children}
    </Motion>
  );
}
