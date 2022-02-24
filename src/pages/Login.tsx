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

const CardsContainer = styled(motion.div)`
  height: 100%;
  display: flex;
  align-items: center;

  flex-direction: column;
  justify-content: top;
  padding: 96px 0 32px;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
    padding: 0;
  }
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
  const [isSigningIn, setIsSigningIn] = useState(false);

  return (
    <PageMotion
      variants={visibilityVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <MapBackground>
        <CardsContainer variants={visibilityVariants}>
          <AnimatePresence exitBeforeEnter>
            {view === "login" && (
              <WelcomeCard
                key="welcomeCard"
                onClickRegister={() => setView("register")}
                disabled={isSigningIn}
              />
            )}
            {view === "login" && (
              <LoginCard
                key="loginCard"
                onChangeSigningIn={(signingIn) => setIsSigningIn(signingIn)}
              />
            )}
            {view === "register" && (
              <RegisterCard onClickBack={() => setView("login")} />
            )}
          </AnimatePresence>
        </CardsContainer>
      </MapBackground>
    </PageMotion>
  );
}
