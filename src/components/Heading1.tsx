import { ReactNode } from "react";
import styled from "styled-components";

const H1 = styled.h1`
  margin: 16px 0;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export default function Heading1(props: { children?: ReactNode }) {
  return <H1>{props.children}</H1>;
}
