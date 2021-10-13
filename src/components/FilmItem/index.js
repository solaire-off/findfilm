/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import PropTypes from "prop-types";
import { FilmItemMenu } from "../FilmItemMenu";

import "./FilmItem.sass";

import filmCardPlaceholder from "../../assets/images/placeholder_320x455_ffffff_cccccc.jpg";

const FilmItem = ({
  id,
  title,
  genre,
  releaseDate,
  thumbnail,
  actions,
  onClick,
}) => {
  return (
    <div className="film-card">
      {actions && <FilmItemMenu actions={actions} />}
      <div onClick={() => onClick(id)} className="film-card__in">
        <img className="film-card__thumbnail" src={thumbnail} alt={title} />
        <div className="film-card__header">
          <p className="film-card__title">{title}</p>
          <p className="film-card__timestamp">{releaseDate}</p>
        </div>
        <p className="film-card__meta">{genre}</p>
      </div>
    </div>
  );
};

FilmItem.propTypes = {
  id: PropTypes.string.isRequired,
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
  onClick: PropTypes.func.isRequired,
};

FilmItem.defaultProps = {
  thumbnail: filmCardPlaceholder,
  actions: [],
};

export default FilmItem;
