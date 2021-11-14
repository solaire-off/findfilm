import React from "react";
import { render } from "@testing-library/react";
import { Option } from "..";

const label = "Some option";

it("Current render when check prop", () => {
  const { asFragment } = render(
    <Option
      label={label}
      isSelected={true}
      getStyles={() => {}}
      cx={() => {}}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("Current render when uncheck prop", () => {
  const { asFragment } = render(
    <Option
      label={label}
      isSelected={false}
      getStyles={() => {}}
      cx={() => {}}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});
