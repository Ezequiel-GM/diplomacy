import { ReactChild } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import DropdownItem from "./dropdownMenu/DropdownItem";

const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
`;

interface Props {
  icon?: ReactChild;
  label: string;
  to: string;
}
export default function DropdownLink(props: Props) {
  return (
    <StyledLink to={props.to}>
      <DropdownItem icon={props.icon} label={props.label} />
    </StyledLink>
  );
}
