import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Button } from "..";

it("Current render with custom style and size classes", () => {
  const { asFragment } = render(
    <Button
      type="button"
      buttonStyle="btn--outline-primary"
      buttonSize="btn--lg"
      additionalClass="custom-btn-class"
    >
      + Add Movie
    </Button>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("Current render with default style and size", () => {
  const { asFragment } = render(
    <Button buttonStyle="btn--wrong-style" buttonSize="btn--wrong-size">
      + Add Movie
    </Button>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("Callback onClick work", () => {
  const mockCallback = jest.fn();
  const buttonText = "+ Add Movie";
  render(
    <Button
      type="button"
      onClick={mockCallback}
      buttonStyle="btn--outline-primary"
    >
      {buttonText}
    </Button>
  );

  userEvent.click(screen.getByText(buttonText));
  expect(mockCallback).toBeCalledTimes(1);
});
