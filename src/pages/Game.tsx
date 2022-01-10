import { useParams } from "@reach/router";

export default function Game() {
  const params = useParams();

  return <>Param: {params.gameId}</>;
}
