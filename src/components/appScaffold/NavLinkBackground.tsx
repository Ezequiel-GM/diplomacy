import { useLocation } from "react-router-dom";
import styled from "styled-components";

const Background = styled.div<{ index: number }>`
  position: absolute;
  z-index: -1;
  background-color: ${({ index, theme }) =>
    index < 0 ? "transparent" : theme.color.primary};
  left: 16px;
  right: 16px;
  top: ${({ index }) => (index < 0 ? "12px" : `${12 + index * 56}px`)};
  height: 48px;
  border-radius: ${({ theme }) => `${theme.borderRadius.navLink}px`};
  transition: 0.5s;
`;

interface Props {
  paths: string[];
}
export default function NavLinkBackground(props: Props) {
  const location = useLocation();

  return (
    <Background
      aria-hidden={true}
      index={props.paths.indexOf(location.pathname)}
    />
  );
}
