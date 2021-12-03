import React from "react";
import { screen, act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { FilmItem } from "..";
import { EXAMPLE_FILM } from "../../../Constants";

const mockOnClick = jest.fn();

it("Current render", async () => {
  await act(async () => {
    render(
      <MemoryRouter initialentries={[{ pathname: "/search" }]}>
        <FilmItem
          id={EXAMPLE_FILM.id}
          title={EXAMPLE_FILM.title}
          genres={EXAMPLE_FILM.genres}
          thumbnail={EXAMPLE_FILM.poster_path}
          releaseDate={EXAMPLE_FILM.release_date}
          link={`/search?movie=${EXAMPLE_FILM.id}`}
          onClick={mockOnClick}
        />
      </MemoryRouter>
    );
  });
  expect(document.body).toMatchSnapshot();
});
