import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { FormControl } from "..";

it("Current render (input) with custom style and additional classes", () => {
  const { asFragment } = render(
    <FormControl
      type="text"
      placeholder="Example placeholder"
      additionalClass="example-additional-class"
      formControlStyle="form-control--light"
      value="Example value"
    />
  );
  expect(asFragment()).toMatchSnapshot();
});

it;

it("Current render (input) with default style and size", () => {
  const { asFragment } = render(
    <FormControl
      type="text"
      placeholder="Example placeholder"
      value="Example value"
      callback={() => {}}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("Current render (textarea) with default style and size", () => {
  const { asFragment } = render(
    <FormControl
      type="textarea"
      placeholder="Example placeholder"
      value="Example value"
    />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("Callback onChange work (textarea)", () => {
  const mockCallback = jest.fn();
  const captionToType = "Hello";
  render(
    <FormControl
      type="textarea"
      placeholder="Example placeholder"
      callback={mockCallback}
    />
  );
  userEvent.type(screen.getByRole("textbox"), captionToType);
  expect(mockCallback).toBeCalledTimes(captionToType.length);
});

it("Callback onChange work (input)", () => {
  const mockCallback = jest.fn();
  const captionToType = "Hello";
  render(
    <FormControl
      type="text"
      placeholder="Example placeholder"
      callback={mockCallback}
    />
  );
  userEvent.type(screen.getByRole("textbox"), captionToType);
  expect(mockCallback).toBeCalledTimes(captionToType.length);
});

it("Current render when disabled(textarea)", () => {
  const { asFragment } = render(
    <FormControl
      type="textarea"
      placeholder="Example placeholder"
      disabled={true}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});

it("Current render when disabled(input)", () => {
  const { asFragment } = render(
    <FormControl
      type="text"
      placeholder="Example placeholder"
      disabled={true}
    />
  );
  expect(asFragment()).toMatchSnapshot();
});
