import { useMemo } from "react";
import styled from "styled-components";

const Path = styled.path`
  stroke: black;
  stroke-width: 4;
  fill: rgba(255, 255, 255, 0);
  //transition: fill 0.1s, stroke 0.1s;

  &:hover {
    fill: rgba(255, 255, 255, 0.1);
    stroke: white;
    cursor: pointer;
  }

  &:active {
    fill: rgba(255, 255, 255, 0);
  }
`;

interface Props {
  onHover: () => void;
  onClick: () => void;
  region: {
    name: string;
    centerPoint: {
      x: number;
      y: number;
    };
    coordinates: {
      x: number;
      y: number;
    }[];
  };
}
export default function Region(props: Props): JSX.Element {
  const shapeData = useMemo(
    () =>
      props.region.coordinates.reduce<string>((previous, point, i) => {
        let coordinate = "";
        if (i === 0) coordinate = `M${point.x},${point.y} `;
        else coordinate = `L${point.x},${point.y} `;
        if (i === props.region.coordinates.length - 1) coordinate += "Z";
        return previous + coordinate;
      }, ""),
    [props.region.coordinates]
  );

  return (
    <Path
      d={shapeData}
      onMouseOver={() => props.onHover()}
      onClick={() => props.onClick()}
    />
  );
}
