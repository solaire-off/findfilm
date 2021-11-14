import React from "react";
import { Provider } from "react-redux";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import { FilmList } from "./components/FilmList";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { FilmListSettings } from "./components/FilmListSettings";
import { NotFoundPage } from "./components/NotFoundPage";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ModalManager } from "./components/ModalManager";
import { ModalManagerProvider } from "./context/ModalManagerContext";
import { store } from "./store";
import { SITE_NAME } from "./Constants";
import "./App.sass";

const App = () => {
  return (
    <HashRouter>
      <Provider store={store}>
        <ModalManagerProvider>
          <Header title={SITE_NAME} />
          <Switch>
            <Route exact path="/">
              <Redirect to="/search" />
            </Route>
            <Route path="/search/:searchQuery?">
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
            </Route>
            <Route component={NotFoundPage} />
          </Switch>
          <Footer title={SITE_NAME} />
          <ModalManager />
        </ModalManagerProvider>
      </Provider>
    </HashRouter>
  );
};

export default App;
