import { useParams } from "react-router-dom";
import GameMap from "../components/game/GameMap";

export default function Game(): JSX.Element {
  const params = useParams<{ gameId: string }>();

  return (
    <>
      <GameMap gameId={params.gameId!} />
    </>
  );
}
