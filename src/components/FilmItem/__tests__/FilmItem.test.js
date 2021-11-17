import React from "react";
import { screen, act, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FilmItem } from "..";
import { EXAMPLE_FILM } from "../../../Constants";

const mockOnClick = jest.fn();

it("Current render", async () => {
  await act(async () => {
    render(
      <FilmItem
        id={EXAMPLE_FILM.id}
        title={EXAMPLE_FILM.title}
        genres={EXAMPLE_FILM.genres}
        thumbnail={EXAMPLE_FILM.poster_path}
        releaseDate={EXAMPLE_FILM.release_date}
        onClick={mockOnClick}
      />
    );
  });
  expect(document.body).toMatchSnapshot();
});

it("Current render", async () => {
  await act(async () => {
    render(
      <FilmItem
        id={EXAMPLE_FILM.id}
        title={EXAMPLE_FILM.title}
        genres={EXAMPLE_FILM.genres}
        thumbnail={EXAMPLE_FILM.poster_path}
        releaseDate={EXAMPLE_FILM.release_date}
        onClick={mockOnClick}
      />
    );
  });

  userEvent.click(screen.getByText(EXAMPLE_FILM.title));

  expect(mockOnClick).toBeCalledTimes(1);
});
