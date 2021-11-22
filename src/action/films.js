import { DEFAULT_SORT_FIELD } from "../Constants";
import { SET_FILMS } from "./action-types";
import { API_ROOT } from "../Constants";
import fetch from "isomorphic-fetch";

export const setFilms = (list) => ({
  type: SET_FILMS,
  payload: list,
});

export const fetchFilms = (count, location, searchQuery) => {
  return (dispatch) => {
    const query = new URLSearchParams(location.search);
    const sort = query?.get("sortBy") || DEFAULT_SORT_FIELD;
    const sortOrder = sort === "title" ? "asc" : "desc";
    const genre = query?.get("genre");
    let url = `${API_ROOT}/movies?limit=${count}&sortBy=${sort}&sortOrder=${sortOrder}`;
    if (genre) {
      url += `&filter=${genre}`;
    }
    if (searchQuery) {
      url += `&search=${searchQuery}&searchBy=title`;
    }
    return fetch(url)
      .then((response) => response.json())
      .then((list) => dispatch(setFilms(list.data)));
  };
};
