import React from "react";
import { Provider } from "react-redux";
import { FilmList } from "./components/FilmList";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { FilmListSettings } from "./components/FilmListSettings";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ModalManager } from "./components/ModalManager";
import { FilmInfoContextProvider } from "./context/FilmInfoContext";
import { ModalManagerProvider } from "./context/ModalManagerContext";
import { store } from "./store";
import "./App.sass";

const App = () => {
  const siteName = ["netflix", "roulette"];

  return (
    <Provider store={store}>
      <FilmInfoContextProvider>
        <ModalManagerProvider>
          <Header title={siteName} />
          <Hero title="FIND YOUR MOVIE" />
          <div className="main">
            <div className="container">
              <ErrorBoundary>
                <FilmListSettings />
              </ErrorBoundary>
              <ErrorBoundary>
                <FilmList />
              </ErrorBoundary>
            </div>
          </div>
          <Footer title={siteName} />
          <ModalManager />
        </ModalManagerProvider>
      </FilmInfoContextProvider>
    </Provider>
  );
};

export default App;
