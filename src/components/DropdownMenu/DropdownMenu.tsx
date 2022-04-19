import { ChevronDown } from "@styled-icons/ionicons-outline";
import {
  PropsWithChildren,
  ReactChild,
  useEffect,
  useRef,
  useState,
} from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
`;

const DropdownButton = styled.button`
  display: block;
  align-items: center;
  height: 44px;
  margin: 0;
  padding: 6px;
  background-color: transparent;
  border: none;
  border-radius: ${({ theme }) => theme.borderRadius.button}px;
  color: ${({ theme }) => theme.color.textLight};
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => theme.color.text};
    background-color: ${({ theme }) => theme.color.onPrimaryOverlay};
  }
  transition: 0.5s;
`;

const Chevron = styled(ChevronDown)`
  width: 20px;
`;

const MenuModal = styled.div`
  position: absolute;
  white-space: nowrap;
  padding: 4px;
  right: 0;
  top: 40px;
  min-width: 120px;
  background-color: ${({ theme }) => theme.color.card};
  box-shadow: ${({ theme }) => theme.boxShadow.modal};
  border-radius: ${({ theme }) => theme.borderRadius.modal}px;
`;

interface Props {
  button: ReactChild;
  hideChevron?: boolean;
}
export default function DropdownMenu(props: PropsWithChildren<Props>) {
  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef<any>(null);

  useEffect(() => {
    function handleClick() {
      setIsOpen(false);
    }

    if (isOpen) {
      document.addEventListener("click", handleClick);
      return () => document.removeEventListener("click", handleClick);
    }
  }, [isOpen]);

  return (
    <Wrapper>
      <DropdownButton onClick={() => setIsOpen((open) => !open)}>
        {props.button}
        {!props.hideChevron && <Chevron />}
      </DropdownButton>
      {isOpen && <MenuModal ref={modalRef}>{props.children}</MenuModal>}
    </Wrapper>
  );
}
