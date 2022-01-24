import { ReactNode } from "react";
import styled from "styled-components";

const ErrorMessage = styled.label`
  display: block;
  margin: 0px 12px 8px;
  color: ${(props) => props.theme.color.error};
  font-size: ${(props) => `${props.theme.fontSize.textFieldError}pt`};
`;

interface Props {
  children?: ReactNode | ReactNode[];
}
export default function FormError(props: Props) {
  return <ErrorMessage>{props.children}</ErrorMessage>;
}
