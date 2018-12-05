import React from "react";
import { create } from "react-test-renderer";
import Header from "../Header";

test("should render correctly", () => {
  const c = create(<Header />).toJSON();
  expect(c).toMatchSnapshot();
});
