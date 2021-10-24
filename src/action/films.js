import { SET_FILMS, SET_SORT, SET_GENRE } from "./action-types";

export const setFilms = (list) => ({
  type: SET_FILMS,
  payload: list,
});

export const fetchFilms = (count) => {
  return (dispatch, getState) => {
    const { sort, genre } = getState().films;
    let url = `http://localhost:4000/movies?limit=${count}&sortBy=${sort}&sortOrder=desc`;
    if (genre) {
      url += `&filter=${genre}`;
    }
    fetch(url)
      .then((response) => response.json())
      .then((list) => dispatch(setFilms(list.data)));
  };
};
export const setSort = (type) => {
  return { type: SET_SORT, payload: type };
};

export const setGenre = (genre) => {
  return { type: SET_GENRE, payload: genre };
};
