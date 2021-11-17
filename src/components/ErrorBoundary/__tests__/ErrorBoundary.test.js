import React from "react";
import { ErrorBoundary } from "..";
import { render } from "@testing-library/react";
import { shallow } from "enzyme";

const Something = () => <span>Some working code here</span>;

it("Current render without error", () => {
  const { asFragment } = render(
    <ErrorBoundary>
      <Something />
    </ErrorBoundary>
  );

  expect(asFragment()).toMatchSnapshot();
});

it("Should display an error message if component throws", () => {
  const error = new Error("Test");

  const wrapper = shallow(
    <ErrorBoundary>
      <Something />
    </ErrorBoundary>
  );
  wrapper.find(Something).simulateError(error);

  expect(wrapper.text()).toContain("Oops");
});
