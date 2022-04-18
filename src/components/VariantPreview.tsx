import { useMemo } from "react";
import styled from "styled-components";
import { Point } from "../models/Point";
import { OverlayFill, Region, RegionType, Variant } from "../models/Variant";

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

const Polygon = styled.polygon<{
  type: RegionType;
  ownerColor: string | null;
  border: boolean;
}>`
  fill: ${({ ownerColor, theme, type }) => {
    if (type === "land") {
      return ownerColor || theme.color.land;
    }
    return theme.color.sea;
  }};
  stroke-width: ${({ border }) => (border ? "4px" : "0px")};
  stroke: ${({ theme }) => theme.color.border};
`;

interface Props {
  variant: Variant | undefined;
  width?: string;
}
export default function VariantPreview(props: Props) {
  const ownerColors = useMemo(() => {
    const colors: { [id: string]: string | null } = {};

    if (props.variant) {
      for (const id of Object.keys(props.variant.regions)) {
        const regionOwner =
          props.variant.nationality[id] || props.variant.supplyCenters[id];

        if (regionOwner && regionOwner !== "none") {
          colors[id] = props.variant.nations[regionOwner].color;
        } else {
          colors[id] = null;
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
              region={region}
              ownerColor={ownerColors[id]}
            />
          ))}
        </Map>
      )}
    </Container>
  );
}

interface RegionProps {
  region: Region;
  ownerColor: string | null;
}
function RegionPolygon(props: RegionProps) {
  const shapeToString = (shape: Point[]) => {
    const points = [];
    for (const point of shape) {
      points.push(`${point.x} ${point.y}`);
    }
    return points.join(" ");
  };

  const regionPoints = useMemo(
    () => shapeToString(props.region.shape),
    [props.region.shape]
  );

  const overlays = useMemo(() => {
    if (!props.region.visuals.overlays) return [];

    const overlays: { points: string; fill: OverlayFill; border: boolean }[] =
      [];
    for (const overlay of props.region.visuals.overlays) {
      overlays.push({
        points: shapeToString(overlay.shape),
        fill: overlay.fill,
        border: overlay.border,
      });
    }
    return overlays;
  }, [props.region.visuals.overlays]);

  return (
    <>
      <Polygon
        points={regionPoints}
        type={props.region.type}
        ownerColor={props.ownerColor}
        border={false}
      ></Polygon>
      {overlays.map((overlay, index) => (
        <Polygon
          key={index}
          points={overlay.points}
          type={overlay.fill}
          ownerColor={props.ownerColor}
          border={overlay.border}
        ></Polygon>
      ))}
      <Polygon
        points={regionPoints}
        type={props.region.type}
        ownerColor="transparent"
        border={true}
      ></Polygon>
    </>
  );
}
