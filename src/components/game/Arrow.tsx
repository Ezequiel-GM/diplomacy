import styled from "styled-components";
import { Point } from "../../models/Point";

const Line = styled.line`
  stroke: black;
  stroke-width: 4;
`;

interface Props {
  from: Point;
  to: Point;
}
export default function Arrow(props: Props): JSX.Element {
  return (
    <>
      <defs>
        <marker
          id="arrowhead"
          markerWidth={5}
          markerHeight={3}
          refX={0}
          refY={1.5}
          orient="auto"
        >
          <polygon points="0 0, 5 1.5, 0 3" />
        </marker>
      </defs>
      <Line
        x1={props.from.x}
        y1={props.from.y}
        x2={props.to.x}
        y2={props.to.y}
        markerEnd="url(#arrowhead)"
      />
    </>
  );
}
