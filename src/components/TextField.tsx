import { useState } from "react";
import styled from "styled-components";
import uniqueId from "lodash/uniqueId";

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
  margin: 0 12px 4px;
  font-size: ${(props) => `${props.theme.fontSize.textFieldLabel}pt`};
`;

const Input = styled.input`
  display: block;
  border: 2px solid black;
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
    border: 2px solid ${(props) => props.theme.color.primary};
  }
`;

interface Props {
  type?: string;
  width?: number;
  label?: string;
  placeholder?: string;
}
export default function TextField(props: Props) {
  const [id] = useState(uniqueId("textfield-"));

  return (
    <Wrapper>
      {props.label ? <Label htmlFor={id}>{props.label}</Label> : null}
      <Input
        id={id}
        width={props.width}
        placeholder={props.placeholder}
        type={props.type}
      />
    </Wrapper>
  );
}
