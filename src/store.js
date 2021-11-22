import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { filmsReducer } from "./reducer/films";

const rootReducer = combineReducers({ films: filmsReducer });
const composeEnhancers =
  typeof window !== "undefined"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    : compose;

export const configureStore = (prevState) => {
  const store = createStore(
    rootReducer,
    prevState,
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
