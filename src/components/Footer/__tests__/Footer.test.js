import React from "react";
import { render } from "@testing-library/react";
import { SITE_NAME } from "../../../Constants";
import { Footer } from "..";

it("Current render", () => {
  const { asFragment } = render(<Footer title={SITE_NAME} />);
  expect(asFragment()).toMatchSnapshot();
});
