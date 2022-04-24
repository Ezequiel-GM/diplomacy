import styled from "styled-components";

const Wrapper = styled.div`
  margin: 8px 0;
`;

const GroupLabel = styled.p`
  display: block;
  margin: 0 0 2px;
  padding: 0;
  font-size: ${(props) => `${props.theme.fontSize.textFieldLabel}pt`};
  color: ${({ theme }) => theme.color.text};
`;

const ButtonWrapper = styled.div`
  margin: 2px 0;
`;

const Button = styled.input<{ disabled?: boolean }>`
  accent-color: ${({ theme }) => theme.color.primary};
`;

const ButtonLabel = styled.label<{ disabled?: boolean }>`
  font-size: ${(props) => `${props.theme.fontSize.textFieldLabel}pt`};
  color: ${({ disabled, theme }) =>
    disabled ? theme.color.textDisabled : theme.color.text};
`;

interface Props {
  items: { label: string; value: string }[];
  selected?: string;
  label?: string;
  disabled?: boolean;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
}
export default function RadioGroup(props: Props) {
  return (
    <Wrapper>
      {props.label && <GroupLabel>{props.label}</GroupLabel>}
      {props.items.map((item, index) => (
        <ButtonWrapper key={item.value}>
          <Button
            type="radio"
            id={item.value}
            name={item.label}
            value={item.value}
            disabled={props.disabled}
            checked={
              props.selected ? props.selected === item.value : index === 0
            }
            onChange={props.onChange}
            onBlur={props.onBlur}
          />
          <ButtonLabel htmlFor={item.value} disabled={props.disabled}>
            {item.label}
          </ButtonLabel>
        </ButtonWrapper>
      ))}
    </Wrapper>
  );
}
