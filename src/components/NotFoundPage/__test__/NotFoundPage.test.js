import React from "react";
import { render } from "@testing-library/react";
import { NotFoundPage } from "..";
import { MemoryRouter } from "react-router-dom";

it("Current render", () => {
  const { asFragment } = render(
    <MemoryRouter initialEntries={["/wrong-url"]}>
      <NotFoundPage />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
