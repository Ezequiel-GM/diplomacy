import styled from "styled-components";

const Wrapper = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Loading() {
  return (
    <Wrapper>
      <div>Loading...</div>
    </Wrapper>
  );
}
