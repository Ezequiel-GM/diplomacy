import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const NavLink = styled(Link)<{ matches: number }>`
  height: 100%;
  padding: 0px 32px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  font-size: ${({ theme }) => `${theme.fontSize.navLink}pt`};
  color: ${({ theme }) => theme.color.primary};

  background-color: ${({ matches, theme }) =>
    matches ? theme.color.onPrimaryOverlay : ""};
  &:hover {
    background-color: ${({ theme }) => theme.color.onPrimaryOverlay};
  }
  &:active {
    background-color: ${({ theme }) => theme.color.onPrimaryOverlay};
    padding: 4px 32px 0px;
    height: calc(100% - 4px);
  }
  transition: padding 0.1s, height 0.1s;
`;

const routes = [
  {
    name: "Games",
    path: "/games",
  },
  {
    name: "Sandboxes",
    path: "/sandboxes",
  },
  {
    name: "Rules",
    path: "/rules",
  },
];

export default function NavLinks() {
  const location = useLocation();

  const matches = (path: string): number =>
    path === location.pathname ? 1 : 0;

  return (
    <>
      {routes.map((route) => (
        <NavLink to={route.path} key={route.path} matches={matches(route.path)}>
          {route.name}
        </NavLink>
      ))}
    </>
  );
}
