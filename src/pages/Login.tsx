import { motion } from "framer-motion";
import styled from "styled-components";
import LoginCard from "../components/login/LoginCard";
import MapBackground from "../components/login/MapBackground";
import WelcomeCard from "../components/login/WelcomeCard";

const PageMotion = styled(motion.main)`
  height: 100%;
`;

const Center = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardWrapper = styled(motion.div)`
  margin: 32px;
`;

const visibilityVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      delayChildren: 0.25,
      staggerChildren: 0.25,
    },
  },
};

export default function Login() {
  return (
    <PageMotion
      variants={visibilityVariants}
      initial="hidden"
      animate="visible"
    >
      <MapBackground>
        <Center>
          <CardWrapper variants={visibilityVariants}>
            <WelcomeCard />
          </CardWrapper>
          <CardWrapper variants={visibilityVariants}>
            <LoginCard />
          </CardWrapper>
        </Center>
      </MapBackground>
    </PageMotion>
  );
}
