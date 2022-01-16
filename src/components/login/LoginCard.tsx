import Card from "../Card";
import Heading1 from "../Heading1";
import TextButton from "../TextButton";
import TextField from "../TextField";

export default function LoginCard() {
  return (
    <Card>
      <Heading1>Sign In</Heading1>
      <TextField label="Email" type="email" />
      <TextField label="Password" type="password" />
      <TextButton width="100%">Log In</TextButton>
    </Card>
  );
}
