import React from "react";
import { Global, css } from "@emotion/core";
import colors from "./colors";

const GlobalStyles = () => (
  <Global
    styles={css`
      * {
        box-sizing: border-box;
        color: ${colors.dark};
      }

      body {
        background-color: ${colors.greyLight};
        font-family: "Quicksand", sans-serif;
        margin: 0;
      }

      .visuallyhidden {
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
      }
    `}
  />
);

export default GlobalStyles;
