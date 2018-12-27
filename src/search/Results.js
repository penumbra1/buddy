import React from "react";
import styled from "@emotion/styled";

const Wrapper = styled.ul`
  display: grid;
  margin: 0;
  padding: 0;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));

  @media (max-width: 768px) {
    grid-template-columns: 100%;
  }

  p {
    font-size: 1.8rem;
    grid-column: 1/-1;
    margin: 5rem 0;
    text-align: center;
  }
`;

const Results = ({ children }) => (
  <Wrapper>{children.length > 0 ? children : <p>No results</p>}</Wrapper>
);

export default Results;
