import { ReactNode } from "react";
import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  margin: 0;
  padding: 0;
  border: none;
  background: none;
  text-decoration: underline;
  color: ${(props) => props.theme.color.primary};
`;

interface Props {
  children?: ReactNode | ReactNode[];
  onClick: () => void;
}
export default function LinkButton(props: Props): JSX.Element {
  return <Button onClick={props.onClick}>{props.children}</Button>;
}
