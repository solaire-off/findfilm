import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ImageFallback } from "../ImageFallback";
import { minutesToHoursAndMinutes } from "../../Heplers";
import filmCardPlaceholder from "../../assets/images/placeholder_netflix.jpg";

import "./FilmInfo.sass";

export const FilmInfo = ({ id }) => {
  const [film, setFilm] = useState(null);

  const scrollToTop = () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  const fetchFilmByID = (filmID) => {
    fetch(`http://localhost:4000/movies/${filmID}`)
      .then((response) => response.json())
      .then((filmData) => setFilm(filmData));
  };

  useEffect(() => {
    fetchFilmByID(id);
    scrollToTop();
  }, [id]);

  const genresCaption = film ? film.genres.join(", ") : "";
  const releaseDateObject = film ? new Date(film.release_date) : new Date();
  const releaseYear = releaseDateObject.getFullYear();
  const runtime = film ? minutesToHoursAndMinutes(film.runtime) : 0;

  return (
    film && (
      <div className="film-article">
        <div className="film-article__in">
          <ImageFallback
            className="film-article__thumbnail"
            src={film.poster_path}
            fallback={filmCardPlaceholder}
            alt={film.title}
          />

          <div className="film-article__content">
            <div className="film-article__header">
              <p className="film-article__title">
                <span>{film.title}</span>
                {film.vote_average !== 0 ? (
                  <span className="film-article__rating">
                    {film.vote_average}
                  </span>
                ) : null}
              </p>
              <p className="film-article__subtitle">{genresCaption}</p>
            </div>
            <p className="film-article__meta-list">
              <span className="film-article__meta">{releaseYear}</span>
              {runtime !== 0 ? (
                <span className="film-article__meta">{runtime}</span>
              ) : null}
            </p>
            <p className="film-article__text">{film.overview}</p>
          </div>
        </div>
      </div>
    )
  );
};

FilmInfo.propTypes = {
  id: PropTypes.number.isRequired,
};
