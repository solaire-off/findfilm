import React from "react";
import { render, act } from "@testing-library/react";
import { FilmInfo } from "..";
import { EXAMPLE_FILM } from "../../../Constants";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(EXAMPLE_FILM),
  })
);

window.scroll = () => {}; // provide an empty implementation for window.scroll

it("Current render", async () => {
  await act(async () => {
    render(<FilmInfo id={EXAMPLE_FILM.id} />);
  });
  expect(document.body).toMatchSnapshot();
});
