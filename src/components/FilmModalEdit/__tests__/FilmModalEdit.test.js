import React from "react";
import { render, act } from "@testing-library/react";
import { FilmModalEdit } from "..";
import { EXAMPLE_FILM } from "../../../Constants";
import { MemoryRouter } from "react-router-dom";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(EXAMPLE_FILM),
  })
);

window.scroll = () => {}; // provide an empty implementation for window.scroll

it("Current render when 'add' mode", async () => {
  await act(async () => {
    render(
      <MemoryRouter initialentries={[{ pathname: "/search" }]}>
        <FilmModalEdit modalTitle="Add film" sendFilmData={() => {}} />
      </MemoryRouter>
    );
  });
  expect(document.body).toMatchSnapshot();
});

it("Current render 'edit' mode", async () => {
  await act(async () => {
    render(
      <MemoryRouter initialentries={[{ pathname: "/search" }]}>
        <FilmModalEdit
          modalTitle="Edit modal"
          id={EXAMPLE_FILM.id}
          sendFilmData={() => {}}
        />
      </MemoryRouter>
    );
  });
  expect(document.body).toMatchSnapshot();
});
