import { SET_FILMS } from "../action/action-types";

export const initialState = {
  list: [],
};

export const filmsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FILMS:
      return { ...state, list: action.payload };
    default:
      return state;
  }
};
