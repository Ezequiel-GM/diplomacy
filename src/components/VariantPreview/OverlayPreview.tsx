import { useMemo } from "react";
import { RegionOverlay } from "../../models/Variant";
import Polygon from "./Polygon";

interface Props {
  overlay: RegionOverlay;
  ownerColor: string | null;
}
export default function OverlayPreview(props: Props) {
  const points = useMemo(() => {
    const points = [];
    for (const point of props.overlay.shape) {
      points.push(`${point.x} ${point.y}`);
    }
    return points.join(" ");
  }, [props.overlay.shape]);

  return (
    <Polygon
      points={points}
      type={props.overlay.fill}
      ownerColor={props.ownerColor}
      border={props.overlay.border}
    ></Polygon>
  );
}
