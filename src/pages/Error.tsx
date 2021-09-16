import { AuthError } from "firebase/auth";

interface Props {
  error: AuthError;
}

export default function Error(props: Props) {
  return <>{props.error.message}</>;
}
