import { filmsReducer } from "../films";
import { initialState as filmsReducerInitialState } from "../films";
import { setFilms } from "../../action/films";
import { EXAMPLE_FILM_LIST } from "../../Constants";

test("should return the initial state", () => {
  expect(filmsReducer(undefined, {})).toEqual(filmsReducerInitialState);
});

test("should return object with new list of films", () => {
  const previousState = filmsReducerInitialState;
  expect(filmsReducer(previousState, setFilms(EXAMPLE_FILM_LIST))).toEqual({
    list: EXAMPLE_FILM_LIST,
  });
});
