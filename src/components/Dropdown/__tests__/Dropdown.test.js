import React from "react";
import { Dropdown } from "..";
import { render, screen } from "@testing-library/react";
import { SORT_TYPES } from "../../../Constants";
import userEvent from "@testing-library/user-event";

it("Current render", () => {
  const { asFragment } = render(
    <Dropdown
      label="Sort by"
      options={SORT_TYPES}
      selectedValue={SORT_TYPES[0].value}
      callback={() => {}}
    />
  );

  expect(asFragment()).toMatchSnapshot();
});

it("Callback is worked", () => {
  const mockCallback = jest.fn();

  render(
    <Dropdown
      label="Sort by"
      options={SORT_TYPES}
      selectedValue={SORT_TYPES[0].value}
      callback={mockCallback}
    />
  );
  userEvent.selectOptions(
    screen.getByRole("combobox"), // combobox === select
    screen.getByRole("option", { name: SORT_TYPES[1].name })
  );

  expect(mockCallback).toHaveBeenCalledWith(SORT_TYPES[1].value);
});
