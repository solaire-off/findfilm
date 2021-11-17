import React from "react";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Tabs } from "..";

const selectedTab = "All";
const tabsList = [
  {
    name: selectedTab,
  },
  {
    name: "Another tab",
  },
];

it("Current render", () => {
  const { asFragment } = render(
    <Tabs list={tabsList} selectedTab={selectedTab} callback={() => {}} />
  );

  expect(asFragment()).toMatchSnapshot();
});

it("Callback onClick work", () => {
  const mockCallback = jest.fn();
  render(
    <Tabs list={tabsList} selectedTab={selectedTab} callback={mockCallback} />
  );

  userEvent.click(screen.getByText("Another tab"));
  expect(mockCallback).toBeCalledTimes(1);
});
