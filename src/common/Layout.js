import React from "react";
import styled from "@emotion/styled";
import colors from "../colors";
import Header from "./Header";

const MainBox = styled.main`
  margin: 0 auto;
  border-radius: 5px;
  background-color: ${colors.greyLight};
  min-height: 100vh;
`;

const Layout = props => {
  return (
    <>
      <Header />
      <MainBox>{props.children}</MainBox>
    </>
  );
};

export default Layout;
