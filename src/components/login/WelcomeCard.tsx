import styled from "styled-components";
import Card from "../Card";
import Heading1 from "../Heading1";
import TextButton from "../TextButton";

const Paragraph = styled.p`
  margin: 16px 0 8px;
`;

const UnorderedList = styled.ul`
  margin: 8px 0 16px;
`;

const ListItem = styled.li`
  margin: 4px 0;
`;

interface Props {
  onClickRegister: () => void;
  disabled: boolean;
}
export default function WelcomeCard(props: Props) {
  return (
    <Card width={240}>
      <Heading1>Welcome!</Heading1>
      <Paragraph>
        <b>Diplomatic</b> is a modern, online diplomacy game to play with your
        friends, and it's <strong>100% free!</strong>
      </Paragraph>
      <Paragraph>Key features include:</Paragraph>
      <UnorderedList>
        <ListItem>
          <b>Sandbox mode</b>
        </ListItem>
        <ListItem>
          <b>Live map updates</b>
        </ListItem>
        <ListItem>
          <b>Custom game maps</b>
        </ListItem>
      </UnorderedList>
      <TextButton
        width="100%"
        onClick={props.onClickRegister}
        disabled={props.disabled}
      >
        Create an Account
      </TextButton>
    </Card>
  );
}
