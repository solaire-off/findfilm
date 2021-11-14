import React from "react";
import { useHistory } from "react-router-dom";
import { Dropdown } from "../Dropdown";
import { Tabs } from "../Tabs";
import {
  DEFAULT_GENRE_ANY,
  DEFAULT_SORT_FIELD,
  GENRES_LIST,
} from "../../Constants";
import { useQuery } from "../../Heplers";

export const FilmListSettings = () => {
  const tabsItems = [
    {
      name: DEFAULT_GENRE_ANY,
    },
  ].concat(
    GENRES_LIST.map((genre) => ({
      name: genre,
    }))
  );
  const sortTypes = [
    {
      name: "popularity",
      value: DEFAULT_SORT_FIELD,
    },
    {
      name: "release date",
      value: "release_date",
    },
    {
      name: "rating",
      value: "vote_average",
    },
    {
      name: "name",
      value: "title",
    },
  ];

  const query = useQuery();
  const history = useHistory();
  const selectedSort = query.get("sortBy") || DEFAULT_SORT_FIELD;
  const selectedGenre = query.get("genre") || DEFAULT_GENRE_ANY;

  const filterFilmsByGenre = (genre) => {
    if (genre === DEFAULT_GENRE_ANY) {
      query.delete("genre");
    } else {
      query.set("genre", genre);
    }
    history.replace({ search: query.toString() });
  };

  const sortFilmsByField = (sortFied) => {
    if (sortFied === DEFAULT_SORT_FIELD) {
      query.delete("sortBy");
    } else {
      query.set("sortBy", sortFied);
    }
    history.replace({ search: query.toString() });
  };

  return (
    <div className="settings">
      <Tabs
        list={tabsItems}
        selectedTab={selectedGenre}
        callback={filterFilmsByGenre}
      />
      <Dropdown
        label="Sort by"
        options={sortTypes}
        selectedValue={selectedSort}
        callback={sortFilmsByField}
      />
    </div>
  );
};
