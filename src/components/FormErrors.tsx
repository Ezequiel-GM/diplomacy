import styled from "styled-components";

const ErrorMessage = styled.label`
  color: ${(props) => props.theme.color.error};
  font-size: ${(props) => `${props.theme.fontSize.textFieldError}pt`};
`;

export default function FormError() {
  return <div></div>;
}
