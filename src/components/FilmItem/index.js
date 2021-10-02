import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import "./FilmItem.sass"

import filmCardPlaceholder from './../../assets/images/placeholder_320x455_ffffff_cccccc.jpg'

const FilmItem = ({ title, genre, release_date, thumbnail, onClickEdit, onClickDelete }) => {
    const checkFilmCardThumbnail = thumbnail ?
        thumbnail : filmCardPlaceholder;

    const [showMenu, setShowMenu] = useState(false)
    const menuRef = useRef(null)
    const handleClickOutside = (event) => {
        if (menuRef.current && !menuRef.current.contains(event.target)) {
            setShowMenu(false)
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
        }
    })

    const clickToEditBtn = () => {
        setShowMenu(false)
        onClickEdit()
    }
    const clickToDeleteBtn = () => {
        setShowMenu(false);
        onClickDelete()
    }

    return (
        <div className="film-card">
            <div className="film-card__in">
                <div
                    ref={menuRef}
                    className={`film-card__menu ${showMenu ? 'film-card__menu--open' : null}`}>
                    <button onClick={() => setShowMenu(true)}
                        className="film-card__menu-toggle"
                        aria-label="Film menu"></button>
                    <div className="film-card__actions">
                        <button
                            onClick={() => setShowMenu(false)}
                            className="film-card__actions-toggle"
                            aria-label="Close"></button>
                        <button onClick={clickToEditBtn} className="film-card__actions-item">
                            Edit
                        </button>
                        <button onClick={clickToDeleteBtn} className="film-card__actions-item">
                            Delete
                        </button>
                    </div>
                </div>
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
    onClickEdit: PropTypes.func.isRequired,
    onClickDelete: PropTypes.func.isRequired
}

export default FilmItem
