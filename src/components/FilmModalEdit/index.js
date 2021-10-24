import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { minutesToHoursAndMinutes } from "../../Heplers";
import { FormControl } from "../FormControl";
import { Button } from "../Button";

import "./FilmModal.sass";

export const FilmModalEdit = ({ modalTitle, id, closeModal }) => {
  const [selectedFilm, setSelectedFilm] = useState(null);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    closeModal();
  };

  const fetchFilmByID = (filmID) => {
    fetch(`http://localhost:4000/movies/${filmID}`)
      .then((response) => response.json())
      .then((filmData) => setSelectedFilm(filmData));
  };

  useEffect(() => {
    fetchFilmByID(id);
  }, [id]);

  const checkTitle = selectedFilm ? selectedFilm.title : null;
  const checkReleaseDate = selectedFilm ? selectedFilm.release_date : null;
  const checkUrl = selectedFilm ? selectedFilm.poster_path : null;
  const checkRating = selectedFilm ? selectedFilm.vote_average : null;
  const checkGenre = selectedFilm ? selectedFilm.genres.join(", ") : null;
  const checkRuntime = selectedFilm
    ? minutesToHoursAndMinutes(selectedFilm.runtime)
    : null;
  const checkOverview = selectedFilm ? selectedFilm.overview : null;
  return (
    <form action="." method="POST" onSubmit={handleFormSubmit}>
      <div className="modal__header">
        <p className="modal__title">{modalTitle}</p>
        <button
          onClick={closeModal}
          type="button"
          className="modal__close"
          aria-label="Close"
        />
      </div>
      <div className="modal__body">
        <div className="film-modal__row film-modal__group">
          <label className="label">
            <span className="label__caption">TITLE</span>
            <FormControl
              type="text"
              placeholder="Movie title"
              value={checkTitle}
            />
          </label>
          <label className="label">
            <span className="label__caption">RELEASE DATE</span>
            <FormControl
              type="text"
              placeholder="Select Date"
              value={checkReleaseDate}
            />
          </label>
          <label className="label">
            <span className="label__caption">MOVIE URL</span>
            <FormControl type="text" placeholder="https://" value={checkUrl} />
          </label>
          <label className="label">
            <span className="label__caption">RATING</span>
            <FormControl type="text" placeholder="7.8" value={checkRating} />
          </label>
          <label className="label">
            <span className="label__caption">GENRE</span>
            <FormControl
              type="text"
              placeholder="Input Genre"
              value={checkGenre}
            />
          </label>
          <label className="label">
            <span className="label__caption">RUNTIME</span>
            <FormControl
              type="text"
              placeholder="Minutes"
              value={checkRuntime}
            />
          </label>
        </div>
        <div className="film-modal__group">
          <label className="label">
            <span className="label__caption">OVERVIEW</span>
            <FormControl
              placeholder="Movie description"
              type="textarea"
              value={checkOverview}
            />
          </label>
        </div>
      </div>
      <div className="modal__footer modal__footer--mt">
        <Button
          type="reset"
          buttonStyle="btn--outline-danger"
          buttonSize="btn--lg"
          additionalClass="modal__btn font-weight-medium"
        >
          Reset
        </Button>
        <Button
          type="submit"
          buttonStyle="btn--primary"
          buttonSize="btn--lg"
          additionalClass="modal__btn font-weight-medium"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};

FilmModalEdit.propTypes = {
  modalTitle: PropTypes.string.isRequired,
  id: PropTypes.string,

  closeModal: PropTypes.func,
};

FilmModalEdit.defaultProps = {
  id: null,
  closeModal: () => {},
};
