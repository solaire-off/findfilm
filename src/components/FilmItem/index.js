import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FilmItemMenu } from '../FilmItemMenu';

import "./FilmItem.sass"

import filmCardPlaceholder from './../../assets/images/placeholder_320x455_ffffff_cccccc.jpg'

const FilmItem = ({ title, genre, release_date, thumbnail, actions }) => {
    const checkFilmCardThumbnail = thumbnail ?
        thumbnail : filmCardPlaceholder;

    return (
        <div className="film-card">
            <div className="film-card__in">
                {actions && <FilmItemMenu actions={actions} />}
                <img className="film-card__thumbnail"
                    src={checkFilmCardThumbnail}
                    alt={title} />
                <div className="film-card__header">
                    <p className="film-card__title">{title}</p>
                    <p className="film-card__timestamp">
                        {release_date}
                    </p>
                </div>
                <p className="film-card__meta">
                    {genre}
                </p>
            </div>
        </div>
    )
}

FilmItem.propTypes = {
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    release_date: PropTypes.string.isRequired,
    thumbnail: PropTypes.string,
    actions: PropTypes.array
}

export default FilmItem
