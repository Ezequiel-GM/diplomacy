import { useState } from "react";
import styled from "styled-components";
import { Point } from "../../models/Point";
import variants from "../../variants.json";
import Arrow from "./Arrow";
import Region from "./Region";

const Map = styled.svg`
  border: 4px solid white;
  width: 40%;
`;

export default function GameMap(props: { gameId: string }): JSX.Element {
  const variant = variants.classic;
  const [mouseOverRegionId, setMouseOverRegionId] = useState<string>();
  const [fromPoint, setFromPoint] = useState<Point>();
  const [toPoint, setToPoint] = useState<Point>();

  const onClickRegion = (centerPoint: Point) => {
    if (toPoint) {
      setToPoint(undefined);
      setFromPoint(centerPoint);
    } else if (fromPoint) {
      setToPoint(centerPoint);
    } else {
      setFromPoint(centerPoint);
    }
  };

  const mouseOverRegion = variant.regions.find(
    (region) => region.id === mouseOverRegionId
  );
  const unselectedRegions = variant.regions.filter(
    (region) => region.id !== mouseOverRegionId
  );

  return (
    <Map viewBox={`0 0 ${variant.width} ${variant.height}`}>
      {unselectedRegions.map((region) => (
        <Region
          key={region.id}
          region={region}
          onHover={() => setMouseOverRegionId(region.id)}
          onClick={() => onClickRegion(region.centerPoint)}
        />
      ))}
      {mouseOverRegion ? (
        <Region
          region={mouseOverRegion}
          onHover={() => {}}
          onClick={() => onClickRegion(mouseOverRegion.centerPoint)}
        />
      ) : null}
      {fromPoint && toPoint ? <Arrow from={fromPoint} to={toPoint} /> : null}
    </Map>
  );
}
