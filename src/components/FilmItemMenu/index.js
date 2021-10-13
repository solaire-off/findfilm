import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

export const FilmItemMenu = ({ id, actions }) => {
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [handleClickOutside]);

  return (
    <div
      ref={menuRef}
      className={`film-card__menu ${showMenu ? "film-card__menu--open" : null}`}
    >
      <button
        type="button"
        onClick={() => setShowMenu(true)}
        className="film-card__menu-toggle"
        aria-label="Film menu"
      />
      <div className="film-card__actions">
        <button
          type="button"
          onClick={() => setShowMenu(false)}
          className="film-card__actions-toggle"
          aria-label="Close"
        />
        {actions.map(({ name, callback }) => (
          <button
            type="button"
            key={`${name}`}
            onClick={() => {
              setShowMenu(false);
              callback(id);
            }}
            className="film-card__actions-item"
          >
            {name}
          </button>
        ))}
      </div>
    </div>
  );
};

FilmItemMenu.propTypes = {
  id: PropTypes.string.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      callback: PropTypes.func.isRequired,
    })
  ),
};

FilmItemMenu.defaultProps = {
  actions: [],
};
