import { SET_FILMS, SET_SORT, SET_GENRE } from "../action/action-types";

const initialState = {
  sort: "release_date",
  genre: null,
  list: [],
};

export const filmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILMS:
      return { ...state, list: action.payload };
    case SET_SORT:
      return { ...state, sort: action.payload };
    case SET_GENRE:
      return { ...state, genre: action.payload };
    default:
      return state;
  }
};
