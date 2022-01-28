import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

const NavLink = styled(Link)<{ matches: number }>`
  height: 100%;
  padding: 0px 24px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-decoration: none;
  font-weight: bold;
  font-size: ${({ theme }) => `${theme.fontSize.navLink}pt`};
  color: ${({ matches, theme }) =>
    matches ? theme.color.text : theme.color.navLink};

  box-sizing: border-box;
  border-style: inset;
  border: none;
  border-top: 3px solid transparent;
  border-bottom: ${({ matches, theme }) =>
    matches ? `3px solid ${theme.color.primary}` : "3px solid transparent"};

  &:hover {
    color: ${({ theme }) => theme.color.text};
    transition: color 0.5s;
  }
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
