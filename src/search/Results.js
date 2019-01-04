import React from "react";
import styled from "@emotion/styled";

const Wrapper = styled.ul`
  display: grid;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 5vw;
  grid-gap: 5rem;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  justify-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }

  .placeholder {
    grid-column: 1/-1;
    margin: 5rem 0;
    text-align: center;
  }
`;

const Results = ({ children = [] }) => (
  <Wrapper>
    {children.length > 0 ? (
      children
    ) : (
      <p className="placeholder">Nothing here...</p>
    )}
  </Wrapper>
);

export default Results;
