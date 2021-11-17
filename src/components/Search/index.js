import React, { useEffect, useState } from "react";
import { useParams, useHistory, generatePath } from "react-router-dom";
import { useQuery } from "../../Heplers";
import { Button } from "../Button";
import { FormControl } from "../FormControl";

import "./Search.sass";

export const Search = () => {
  const query = useQuery();
  const { searchQuery } = useParams();
  const history = useHistory();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.searchQuery.value;

    history.replace({
      pathname: searchValue
        ? generatePath("/search/:searchQuery", {
            searchQuery: searchValue,
          })
        : "/search",
      search: query.toString(),
    });
  };

  const [searchInputText, setSearchInputText] = useState(searchQuery);

  useEffect(() => {
    setSearchInputText(searchQuery);
  }, [searchQuery]);

  return (
    <form
      className="search"
      action="."
      method="GET"
      onSubmit={handleSearchSubmit}
    >
      <FormControl
        type="text"
        placeholder="What do you want to watch?"
        formControlStyle="form-control--light"
        additionalClass="search__input"
        value={searchInputText}
        callback={setSearchInputText}
        name="searchQuery"
      />
      <Button
        type="submit"
        buttonSize="btn--lg"
        buttonStyle="btn--primary"
        additionalClass="font-weight-medium search__btn"
      >
        Search
      </Button>
    </form>
  );
};
