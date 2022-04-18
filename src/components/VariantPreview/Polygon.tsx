import styled from "styled-components";
import { RegionType } from "../../models/Variant";

const StyledPolygon = styled.polygon<{
  border: boolean;
  ownerColor?: string | null;
  type?: RegionType;
}>`
  fill: ${({ ownerColor, theme, type }) => {
    if (type === undefined) {
      return "transparent";
    }
    if (type === "land") {
      return ownerColor || theme.color.land;
    }
    return theme.color.sea;
  }};

  stroke-width: ${({ border }) => (border ? "4px" : "0px")};
  stroke: ${({ theme }) => theme.color.border};
`;

interface Props {
  border: boolean;
  ownerColor?: string | null;
  points: string;
  type?: RegionType;
}
export default function Polygon(props: Props) {
  return (
    <StyledPolygon
      border={props.border}
      ownerColor={props.ownerColor}
      points={props.points}
      type={props.type}
    />
  );
}
