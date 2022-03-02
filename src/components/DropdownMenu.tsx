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
  display: flex;
  height: 32px;
  margin: 0;
  padding: 0;
  background-color: transparent;
  border: none;
  color: gray;
  cursor: pointer;
`;

const Chevron = styled(ChevronDown)`
  width: 20px;
`;

const MenuModal = styled.div`
  position: absolute;
  white-space: nowrap;
  right: 0;
  min-width: 120px;
  background-color: ${({ theme }) => theme.color.card};
  box-shadow: ${({ theme }) => theme.boxShadow.modal};
`;

interface Props {
  button: ReactChild;
}
export default function DropdownMenu(props: PropsWithChildren<Props>) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<any>(null);
  const modalRef = useRef<any>(null);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);

    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <Wrapper>
      <DropdownButton
        onClick={() => setIsOpen((open) => !open)}
        ref={buttonRef}
      >
        {props.button}
        <Chevron />
      </DropdownButton>
      {isOpen && <MenuModal ref={modalRef}>{props.children}</MenuModal>}
    </Wrapper>
  );
}
