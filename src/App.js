import React from "react";
import FilmList from "./components/FilmList";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Footer from "./components/Footer";
import ErrorBoundary from "./components/ErrorBoundary";
import Dropdown from "./components/Dropdown";
import Tabs from "./components/Tabs";
import { FilmInfoContextProvider } from "./context/FilmInfoContext";

import "./App.sass";

const App = () => {
  const siteName = ["netflix", "roulette"];
  const tabsItems = [
    {
      name: "All",
      isActive: true,
    },
    {
      name: "Documentary",
      isActive: false,
    },
    {
      name: "Comedy",
      isActive: false,
    },
    {
      name: "Horror",
      isActive: false,
    },
    {
      name: "Crime",
      isActive: false,
    },
  ];
  const sortTypes = [
    {
      name: "release date",
      value: "release_date",
    },
    {
      name: "movie title",
      value: "title",
    },
  ];

  return (
    <FilmInfoContextProvider value={null}>
      <Header title={siteName} />
      <Hero title="FIND YOUR MOVIE" />
      <div className="main">
        <div className="container">
          <ErrorBoundary>
            <div className="settings">
              <Tabs list={tabsItems} />
              <Dropdown label="Sort by" options={sortTypes} />
            </div>
          </ErrorBoundary>
          <ErrorBoundary>
            <FilmList />
          </ErrorBoundary>
        </div>
      </div>
      <Footer title={siteName} />
    </FilmInfoContextProvider>
  );
};

export default App;
