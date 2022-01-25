import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import LoginCard from "../components/login/LoginCard";
import MapBackground from "../components/login/MapBackground";
import RegisterCard from "../components/login/RegisterCard";
import WelcomeCard from "../components/login/WelcomeCard";

const PageMotion = styled(motion.main)`
  height: 100%;
`;

const Center = styled(motion.div)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CardsPresence = styled(AnimatePresence)`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: wrap;
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
  exit: {
    opacity: 0,
    transition: {
      duration: 1,
    },
  },
};

export default function Login() {
  const [view, setView] = useState<"login" | "register">("login");

  return (
    <PageMotion
      variants={visibilityVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <MapBackground>
        <Center variants={visibilityVariants}>
          <CardsPresence exitBeforeEnter>
            {view === "login" && (
              <WelcomeCard
                key="welcomeCard"
                onClickRegister={() => setView("register")}
              />
            )}
            {view === "login" && <LoginCard key="loginCard" />}
            {view === "register" && (
              <RegisterCard onClickBack={() => setView("login")} />
            )}
          </CardsPresence>
        </Center>
      </MapBackground>
    </PageMotion>
  );
}
