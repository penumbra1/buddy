import React from "react";
import { Global, css } from "@emotion/core";
import colors from "./colors";

const GlobalStyles = () => (
  <Global
    styles={css`
      :root {
        font-size: 62.5%;
      }
      * {
        box-sizing: border-box;
        color: ${colors.dark};

        &:focus {
          outline: 2px solid ${colors.primary};
        }

        &:focus:not(.focus-visible) {
          outline: none;
        }
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

      input,
      textarea,
      select,
      button {
        font-family: inherit;
      }
    `}
  />
);

export default GlobalStyles;
