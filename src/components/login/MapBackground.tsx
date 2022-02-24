import styled from "styled-components";

import map from "../../assets/images/map_background.png";

const Background = styled.div`
  height: 100%;
  background: url(${map}) repeat-x;
  animation: slide 300s linear infinite;
  background-position-y: center;
  background-attachment: fixed;

  @keyframes slide {
    0% {
      background-position-x: -300px;
    }

    100% {
      background-position: -3477px;
    }
  }
`;

interface Props {
  children?: React.ReactNode;
}
export default function MapBackground(props: Props) {
  return <Background>{props.children}</Background>;
}
