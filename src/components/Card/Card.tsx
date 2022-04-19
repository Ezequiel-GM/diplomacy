import { motion } from "framer-motion";
import { ReactNode } from "react";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
  margin: 16px 32px;
`;

const Container = styled.section<Props>`
  width: ${(props) => (props.width ? `${props.width}px` : "auto")};
  height: ${(props) => (props.height ? `${props.height}px` : "auto")};
  background-color: ${(props) => props.theme.color.card};
  border-radius: ${(props) => `${props.theme.borderRadius.card}px`};
  padding: ${(props) => `${props.theme.padding.card}px`};
  box-shadow: ${(props) => props.theme.boxShadow.card};
`;

interface Props {
  width?: number;
  height?: number;
  children?: ReactNode;
}
export default function Card(props: Props) {
  return (
    <Wrapper
      initial={{ opacity: 0, x: 0 }}
      animate={{ opacity: 1, x: 0, transition: { type: "easeIn" } }}
      exit={{ opacity: 0, x: 40, transition: { type: "easeOut" } }}
      transition={{ duration: 0.3 }}
    >
      <Container width={props.width} height={props.height}>
        {props.children}
      </Container>
    </Wrapper>
  );
}
