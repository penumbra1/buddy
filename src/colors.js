import Color from "color";

// Loosely based on https://colorhunt.co/palette/73808

const primary = "#fd7a68";
const dark = "#393a3f";

const secondary = "#7E5B63";

export default {
  white: "#fefdfc",
  light: "#fcf9f2",
  dark,
  greyLight: "#e2dcd5",
  greyDark: "#c2b5b0",
  primary,
  primaryLight: Color(primary)
    .lighten(0.08)
    .hex(),
  primaryDark: Color(primary)
    .darken(0.05)
    .desaturate(0.05)
    .hex(),
  secondary,
  secondaryDark: Color(secondary)
    .darken(0.1)
    .hex(),
  border: "rgba(57, 58, 63, 0.12)",
  darkRGB: "57, 58, 63"
};
