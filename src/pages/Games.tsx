import { motion } from "framer-motion";
import styled from "styled-components";

const PageMotion = styled(motion.main)`
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

export default function Games() {
  return (
    <PageMotion
      variants={visibilityVariants}
      initial="hidden"
      animate="visible"
    ></PageMotion>
  );
}
