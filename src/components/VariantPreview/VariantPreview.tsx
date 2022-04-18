import { useMemo } from "react";
import styled from "styled-components";
import { Variant } from "../../models/Variant";
import RegionPreview from "./RegionPreview";

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
            <RegionPreview
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
