import React from "react";
import { connect } from "react-redux";
import { setGenre, setSort } from "../../action/films";
import { Dropdown } from "../Dropdown";
import { Tabs } from "../Tabs";

const mapDispatchToProps = {
  setSelectedGenre: (genre) => setGenre(genre),
  setSelectedSort: (type) => setSort(type),
};

export const FilmListSettings = connect(
  null,
  mapDispatchToProps
)(({ setSelectedGenre, setSelectedSort }) => {
  const tabsItems = [
    {
      name: "All",
    },
    {
      name: "Documentary",
    },
    {
      name: "Comedy",
    },
    {
      name: "Horror",
    },
    {
      name: "Crime",
    },
  ];
  const sortTypes = [
    {
      name: "release date",
      value: "release_date",
    },
    {
      name: "rating",
      value: "vote_average",
    },
  ];

  const filterFilmsByGenre = (genre) => {
    setSelectedGenre(genre === "All" ? null : genre);
  };

  const sortFilmsByField = (filter) => {
    setSelectedSort(filter);
  };

  return (
    <div className="settings">
      <Tabs list={tabsItems} callback={filterFilmsByGenre} />
      <Dropdown
        label="Sort by"
        options={sortTypes}
        callback={sortFilmsByField}
      />
    </div>
  );
});
