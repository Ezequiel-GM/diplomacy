import { useParams } from "react-router-dom";

export default function Game(): JSX.Element {
  const params = useParams<{ gameId: string }>();

  return <>{params.gameId}</>;
}
