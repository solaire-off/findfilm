import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { filmsReducer } from "./reducer/films";

const rootReducer = combineReducers({ films: filmsReducer });

export const store = createStore(rootReducer, applyMiddleware(thunk));
