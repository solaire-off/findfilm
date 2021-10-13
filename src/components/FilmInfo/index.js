import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "./FilmInfo.sass";
import FilmListData from "../../assets/json/film-list.json";

export const FilmInfo = ({ id }) => {
  const selectedFilm = FilmListData.find((film) => film.id === id);
  const scrollToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  useEffect(() => {
    scrollToTop();
  }, [id]);

  return (
    <div className="film-article">
      <div className="film-article__in">
        <img
          className="film-article__thumbnail"
          src={selectedFilm.thumbnail}
          alt={selectedFilm.title}
        />
        <div className="film-article__content">
          <div className="film-article__header">
            <p className="film-article__title">
              <span>{selectedFilm.title}</span>
              <span className="film-article__rating">
                {selectedFilm.rating}
              </span>
            </p>
            <p className="film-article__subtitle">{selectedFilm.genre}</p>
          </div>
          <p className="film-article__meta-list">
            <span className="film-article__meta">
              {selectedFilm.releaseDate}
            </span>
            <span className="film-article__meta">{selectedFilm.runtime}</span>
          </p>
          <p className="film-article__text">{selectedFilm.overview}</p>
        </div>
      </div>
    </div>
  );
};

FilmInfo.propTypes = {
  id: PropTypes.string.isRequired,
};
