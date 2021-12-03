import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "./store";
import App from "./App";

const store = configureStore(window.PRELOADED_STATE);

ReactDOM.hydrate(
  <App Router={BrowserRouter} store={store} />,
  document.getElementById("root")
);
