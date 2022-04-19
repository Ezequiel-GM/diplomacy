import { ReactNode } from "react";
import styled from "styled-components";

const H2 = styled.h2`
  margin: 12px 0;

  &:first-child {
    margin-top: 0;
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export default function Heading2(props: { children?: ReactNode }) {
  return <H2>{props.children}</H2>;
}
