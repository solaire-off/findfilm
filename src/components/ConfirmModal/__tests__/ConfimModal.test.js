import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ConfirmModal } from "..";

it("Correct render", () => {
  const { asFragment } = render(
    <ConfirmModal
      confirmCallback={() => {}}
      modalTitle="Confirm title"
      modalDescr="Confirm descr"
    />
  );

  expect(asFragment()).toMatchSnapshot();
});

it("Work confim callback", () => {
  const mockCallback = jest.fn();
  const mockClose = jest.fn();

  render(
    <ConfirmModal
      confirmCallback={mockCallback}
      closeModal={mockClose}
      modalTitle="Confirm title"
      modalDescr="Confirm descr"
    />
  );

  userEvent.click(screen.getByText(/Confirm/i, { selector: "button" }));

  expect(mockCallback).toBeCalledTimes(1);
  expect(mockClose).toBeCalledTimes(1);
});
