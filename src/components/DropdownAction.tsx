import { ReactChild } from "react";
import DropdownItem from "./dropdownMenu/DropdownItem";

interface Props {
  icon?: ReactChild;
  label: string;
  onClick: () => void;
}
export default function DropdownAction(props: Props) {
  return (
    <DropdownItem
      icon={props.icon}
      label={props.label}
      onClick={props.onClick}
    />
  );
}
