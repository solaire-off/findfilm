import React from "react";
import PropTypes from "prop-types";
import { Modal } from "../Modal";
import FormControl from "../FormControl";
import Button from "../Button";

import "./FilmModal.sass";

export const FilmModalEdit = ({
  isDisplay,
  closeCallback,
  modalTitle,
  title,
  releaseDate,
  url,
  rating,
  genre,
  runtime,
  overview,
}) => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    closeCallback();
  };
  return (
    <Modal
      additionalClass="film-modal"
      isDisplay={isDisplay}
      closeCallback={closeCallback}
    >
      <form action="." method="POST" onSubmit={handleFormSubmit}>
        <div className="modal__header">
          <p className="modal__title">{modalTitle}</p>
          <button
            onClick={closeCallback}
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
                value={title}
              />
            </label>
            <label className="label">
              <span className="label__caption">RELEASE DATE</span>
              <FormControl
                type="text"
                placeholder="Select Date"
                value={releaseDate}
              />
            </label>
            <label className="label">
              <span className="label__caption">MOVIE URL</span>
              <FormControl type="text" placeholder="https://" value={url} />
            </label>
            <label className="label">
              <span className="label__caption">RATING</span>
              <FormControl type="text" placeholder="7.8" value={rating} />
            </label>
            <label className="label">
              <span className="label__caption">GENRE</span>
              <FormControl
                type="text"
                placeholder="Input Genre"
                value={genre}
              />
            </label>
            <label className="label">
              <span className="label__caption">RUNTIME</span>
              <FormControl type="text" placeholder="Minutes" value={runtime} />
            </label>
          </div>
          <div className="film-modal__group">
            <label className="label">
              <span className="label__caption">OVERVIEW</span>
              <FormControl placeholder="Movie description" value={overview} />
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
            onClick={closeCallback}
          >
            Submit
          </Button>
        </div>
      </form>
    </Modal>
  );
};

FilmModalEdit.propTypes = {
  isDisplay: PropTypes.bool.isRequired,
  closeCallback: PropTypes.func.isRequired,
  modalTitle: PropTypes.string.isRequired,
  title: PropTypes.string,
  releaseDate: PropTypes.string,
  url: PropTypes.string,
  rating: PropTypes.string,
  genre: PropTypes.string,
  runtime: PropTypes.string,
  overview: PropTypes.string,
};

FilmModalEdit.defaultProps = {
  title: "",
  releaseDate: "",
  url: "",
  rating: "",
  genre: "",
  runtime: "",
  overview: "",
};
