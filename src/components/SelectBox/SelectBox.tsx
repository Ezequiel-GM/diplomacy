import styled from "styled-components";

const Wrapper = styled.div`
  margin: 8px 0;
`;

const Label = styled.label<{ disabled?: boolean }>`
  display: block;
  margin: 0 0 2px;
  font-size: ${(props) => `${props.theme.fontSize.textFieldLabel}pt`};
  color: ${({ disabled, theme }) =>
    disabled ? theme.color.textDisabled : theme.color.text};
`;

const Select = styled.select<{ error?: boolean }>`
  background-color: transparent;
  border: 2px solid
    ${({ disabled, error, theme }) =>
      error
        ? theme.color.error
        : disabled
        ? theme.color.borderDisabled
        : theme.color.border};
  border-radius: ${(props) => props.theme.borderRadius.selectBox}px;
  font-size: 12pt;
  padding: 6px 4px;
  outline: none;

  &:focus,
  &:active {
    border: 2px solid
      ${({ error, theme }) => (error ? theme.color.error : theme.color.primary)};
  }
`;

const Option = styled.option`
  padding: 2px;
`;

interface Props {
  id: string;
  name: string;
  items: { label: string; value: string }[];
  width?: number;
  label?: string;
  default?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
}
export default function SelectBox(props: Props) {
  return (
    <Wrapper>
      {props.label && <Label>{props.label}</Label>}
      <Select
        id={props.id}
        name={props.name}
        onChange={props.onChange}
        onBlur={props.onBlur}
        error={props.error}
      >
        {props.default && <Option value="" label={props.default} />}
        {props.items.map((item) => (
          <Option key={item.value} value={item.value} label={item.label} />
        ))}
      </Select>
    </Wrapper>
  );
}
