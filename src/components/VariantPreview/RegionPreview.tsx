import { useMemo } from "react";
import { Region } from "../../models/Variant";
import OverlayPreview from "./OverlayPreview";
import Polygon from "./Polygon";

interface Props {
  region: Region;
  ownerColor: string | null;
}
export default function RegionPreview(props: Props) {
  const points = useMemo(() => {
    const points = [];
    for (const point of props.region.shape) {
      points.push(`${point.x} ${point.y}`);
    }
    return points.join(" ");
  }, [props.region.shape]);

  return (
    <>
      <Polygon
        points={points}
        type={props.region.type}
        ownerColor={props.ownerColor}
        border={false}
      />
      {props.region.visuals.overlays &&
        props.region.visuals.overlays.map((overlay, index) => (
          <OverlayPreview
            key={index}
            overlay={overlay}
            ownerColor={props.ownerColor}
          />
        ))}
      <Polygon points={points} border={true} />
    </>
  );
}
