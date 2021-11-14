import React from "react";
import { screen, act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilmItemMenu } from "..";

const mockAddModal = jest.fn();
const mockDeleteModal = jest.fn();

const filmCardActions = [
  {
    name: "Edit",
    callback: mockAddModal,
  },
  {
    name: "Delete",
    callback: mockDeleteModal,
  },
];

it("Current render", async () => {
  await act(async () => {
    render(<FilmItemMenu id={1} actions={filmCardActions} />);
  });
  expect(document.body).toMatchSnapshot();
});

it("Menu items callbacks is work", async () => {
  await act(async () => {
    render(<FilmItemMenu id={1} actions={filmCardActions} />);
  });

  filmCardActions.forEach((item) => {
    userEvent.click(screen.getByText(item.name));
  });

  filmCardActions.forEach((item) => {
    expect(item.callback.mock.calls.length).toEqual(1);
  });
});
