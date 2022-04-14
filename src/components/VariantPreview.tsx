import { useMemo } from "react";
import styled from "styled-components";
import { Point } from "../models/Point";
import { Region, Variant } from "../models/Variant";

const Container = styled.div<{ width?: string }>`
  width: ${({ width }) => width || "100%"};
  padding: 0 4px 0 0;
`;

const Map = styled.svg`
  width: 100%;
  border-radius: ${({ theme }) => theme.borderRadius.modalInner}px;
  border: 2px solid ${({ theme }) => theme.color.border};
  overflow: hidden;
`;

interface Props {
  variant: Variant | undefined;
  width?: string;
}
export default function VariantPreview(props: Props) {
  const regionColors = useMemo(() => {
    const colors: { [id: string]: string } = {};

    if (props.variant) {
      for (const [id, region] of Object.entries(props.variant.regions)) {
        const regionOwner =
          props.variant.nationality[id] || props.variant.supplyCenters[id];

        if (regionOwner && regionOwner !== "none") {
          colors[id] = props.variant.nations[regionOwner].color;
        } else {
          colors[id] = region.type;
        }
      }
    }
    return colors;
  }, [props.variant]);

  return (
    <Container width={props.width}>
      {props.variant && (
        <Map
          viewBox={`0 0 ${props.variant.dimensions.x} ${props.variant.dimensions.y}`}
        >
          {Object.entries(props.variant.regions).map(([id, region]) => (
            <RegionPolygon
              key={id}
              shape={region.shape}
              fill={regionColors[id]}
            />
          ))}
        </Map>
      )}
    </Container>
  );
}

const Polygon = styled.polygon<{ fill: string }>`
  fill: ${({ fill, theme }) => {
    if (fill === "land") {
      return theme.color.land;
    }
    if (fill === "sea" || fill === "archipelago") {
      return theme.color.sea;
    }
    return fill;
  }};
  stroke-width: 4px;
  stroke: ${({ theme }) => theme.color.border};
`;

interface RegionProps {
  shape: Point[];
  fill: string;
}
function RegionPolygon(props: RegionProps) {
  const pointsString = useMemo(() => {
    let points = [];
    for (const point of props.shape) {
      points.push(`${point.x} ${point.y}`);
    }
    return points.join(" ");
  }, [props.shape]);

  return <Polygon points={pointsString} fill={props.fill}></Polygon>;
}
