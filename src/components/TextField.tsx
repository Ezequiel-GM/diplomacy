import styled from "styled-components";

const Wrapper = styled.div`
  margin: 8px 0;

  &:first-child {
    margin-top: 0;
  }
  &:last-of-type {
    margin-bottom: 12px;
  }
  &:last-child {
    margin-bottom: 0;
  }
`;

const Label = styled.label`
  display: block;
  margin: 0 12px 2px;
  font-size: ${(props) => `${props.theme.fontSize.textFieldLabel}pt`};
`;

const Input = styled.input<{ error?: boolean }>`
  display: block;
  border: 2px solid
    ${({ error, theme }) => (error ? theme.color.error : "black")};
  border-radius: ${(props) => `${props.theme.borderRadius.textField}px`};
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  width: ${(props) => (props.width ? `${props.width}px` : "240px")};
  height: ${(props) => (props.height ? `${props.height}px` : "40px")};
  padding: 12px;
  outline: none;
  font-size: ${(props) => `${props.theme.fontSize.textField}pt`};
  transition: border-color 0.2s;

  &::placeholder,
  &::-webkit-input-placeholder,
  &::first-line {
    opacity: 0.7;
    color: black;
  }

  &&:focus::placeholder,
  &&:focus::-webkit-input-placeholder,
  &&:focus::first-line {
    opacity: 0;
    color: black;
  }

  &:focus {
    border: 2px solid
      ${({ error, theme }) => (error ? theme.color.error : theme.color.primary)};
  }
`;

const ErrorMessage = styled.strong<{ error?: boolean }>`
  display: block;
  margin: 0 12px;
  font-size: ${(props) => `${props.theme.fontSize.textFieldError}pt`};
  font-weight: normal;
  color: ${(props) => props.theme.color.error};

  transition: transform 0.2s;
  transform: ${(props) => (props.error ? "scaleY(1)" : "scaleY(0)")};
  -moz-transform: ${(props) => (props.error ? "scaleY(1)" : "scaleY(0)")};
  -webkit-transform: ${(props) => (props.error ? "scaleY(1)" : "scaleY(0)")};
`;

interface Props {
  id: string;
  name: string;
  type?: string;
  width?: number;
  value?: string;
  label?: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
}
export default function TextField(props: Props) {
  return (
    <Wrapper>
      {props.label ? <Label htmlFor={props.id}>{props.label}</Label> : null}
      <Input
        id={props.id}
        name={props.name}
        type={props.type}
        width={props.width}
        placeholder={props.placeholder}
        error={props.error}
        onChange={(e) => (props.onChange ? props.onChange(e) : null)}
        onBlur={(e) => (props.onBlur ? props.onBlur(e) : null)}
      />
      <ErrorMessage error={props.error}>
        {props.error ? props.errorMessage : null}
      </ErrorMessage>
    </Wrapper>
  );
}
