import { motion } from "framer-motion";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Loading() {
  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div>Loading...</div>
    </Wrapper>
  );
}
