import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

export const FilmItemMenu = ({ actions }) => {
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
    }, [handleClickOutside])

    return (
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
                {actions.map(({ name, callback }, index) =>
                    <button
                        key={`${index}_${name}`}
                        onClick={() => {
                            setShowMenu(false);
                            callback()
                        }}
                        className="film-card__actions-item">
                        {name}
                    </button>
                )}
            </div>
        </div>
    )
}

FilmItemMenu.protoTypes = {
    actions: PropTypes.array.isRequired
}
