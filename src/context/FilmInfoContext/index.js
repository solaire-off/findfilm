import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const FilmInfoContext = createContext();
const FilmInfoActionContext = createContext();

export const useFilmInfoContext = () => useContext(FilmInfoContext);
export const useFilmInfoActionContext = () => useContext(FilmInfoActionContext);

export const FilmInfoContextProvider = ({ children }) => {
  const [selectedFilm, setSelectedFilm] = useState(null);

  return (
    <FilmInfoContext.Provider value={selectedFilm}>
      <FilmInfoActionContext.Provider value={setSelectedFilm}>
        {children}
      </FilmInfoActionContext.Provider>
    </FilmInfoContext.Provider>
  );
};

FilmInfoContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
