import React from "react";
import PropTypes from "prop-types";
import { FilmItemMenu } from "../FilmItemMenu";

import "./FilmItem.sass";

import filmCardPlaceholder from "../../assets/images/placeholder_320x455_ffffff_cccccc.jpg";

const FilmItem = ({ title, genre, releaseDate, thumbnail, actions }) => (
  <div className="film-card">
    <div className="film-card__in">
      {actions && <FilmItemMenu actions={actions} />}
      <img className="film-card__thumbnail" src={thumbnail} alt={title} />
      <div className="film-card__header">
        <p className="film-card__title">{title}</p>
        <p className="film-card__timestamp">{releaseDate}</p>
      </div>
      <p className="film-card__meta">{genre}</p>
    </div>
  </div>
);

FilmItem.propTypes = {
  title: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  releaseDate: PropTypes.string.isRequired,
  thumbnail: PropTypes.string,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      callback: PropTypes.func.isRequired,
    })
  ),
};

FilmItem.defaultProps = {
  thumbnail: filmCardPlaceholder,
  actions: [],
};

export default FilmItem;
