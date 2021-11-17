import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tab } from "..";

const TabCaption = "All";

it("Current render", () => {
  const { asFragment } = render(
    <Tab
      key={TabCaption}
      name={TabCaption}
      isActive={true}
      onClick={() => {}}
    />
  );

  expect(asFragment()).toMatchSnapshot();
});

it("Callback onClick work", () => {
  const mockCallback = jest.fn();
  render(
    <Tab
      key={TabCaption}
      name={TabCaption}
      isActive={false}
      onClick={mockCallback}
    />
  );

  userEvent.click(screen.getByText(TabCaption));
  expect(mockCallback).toBeCalledTimes(1);
});
