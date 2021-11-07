import React from "react";
import PropTypes from "prop-types";
import { FilmInfo } from "../FilmInfo";
import { Search } from "../Search";
import "./Hero.sass";

import heroBanner from "../../assets/images/header.jpg";
import heroBanner2x from "../../assets/images/header@2x.jpg";
import { useQuery } from "../../Heplers";

export const Hero = ({ title }) => {
  const query = useQuery();
  const selectedFilmID = query.get("movie");
  const additionClass = selectedFilmID ? "hero--additional" : "";
  return (
    <div className={`hero ${additionClass}`}>
      <picture>
        <img
          className="hero__bg"
          srcSet={`${heroBanner} 1x, ${heroBanner2x} 2x`}
          src={heroBanner}
          alt="Film List"
        />
      </picture>
      <div className="container">
        {!selectedFilmID ? (
          <div className="hero__content">
            <p className="hero__title font-weight-light">{title}</p>
            <div className="hero__in">
              <Search />
            </div>
          </div>
        ) : (
          <div className="hero__additional">
            <FilmInfo id={selectedFilmID} />
          </div>
        )}
      </div>
    </div>
  );
};

Hero.propTypes = {
  title: PropTypes.string.isRequired,
};
