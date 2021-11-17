import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import ReactSelect from "react-select";
import { useLocation, useParams } from "react-router-dom";
import { fetchFilms } from "../../action/films";
import { FormControl } from "../FormControl";
import { Button } from "../Button";
import { FETCH_FILMS_COUNT, GENRES_LIST } from "../../Constants";
import { Option } from "../Option";
import { FilmSchema } from "../../schema";
import { fetchFilmByID } from "../../api";
import "./FilmModal.sass";

const mapDispatchToProps = {
  fetchFilmsInStore: (count, location, search) =>
    fetchFilms(count, location, search),
};

export const FilmModalEdit = ({
  modalTitle,
  id,
  closeModal,
  fetchFilmsInStore,
  sendFilmData,
}) => {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [selectedGenres, setGenres] = useState([]);

  const location = useLocation();
  const { searchQuery } = useParams();

  const getFilm = (id) => {
    fetchFilmByID(id, (filmData) => {
      setSelectedFilm(filmData);
      setGenres(
        filmData.genres.map((genre) => ({
          value: genre,
          label: genre,
        }))
      );
    });
  };

  useEffect(() => {
    if (id) {
      getFilm(id);
    }
  }, [id]);

  const formSuccessSend = () => {
    fetchFilmsInStore(FETCH_FILMS_COUNT, location, searchQuery);
    closeModal();
  };

  const formik = useFormik({
    initialValues: {
      title: selectedFilm?.title,
      release_date: selectedFilm?.release_date
        ? new Date(selectedFilm?.release_date)
        : null,
      poster_path: selectedFilm?.poster_path,
      vote_average: selectedFilm?.vote_average || null,
      genres: selectedFilm?.genres || [],
      runtime: selectedFilm?.runtime,
      overview: selectedFilm?.overview,
    },
    validationSchema: FilmSchema,
    onSubmit: (values) => sendFilmData(values, id, formSuccessSend),
    enableReinitialize: true,
  });

  const genresOptionsForSelect = Array.from(
    new Set(formik.initialValues.genres.concat(GENRES_LIST))
  ).map((genre) => ({
    value: genre,
    label: genre,
  }));

  const handleGenresSelect = (genres) => {
    setGenres(genres);
    formik.setFieldValue(
      "genres",
      genres.map((item) => item.label)
    );
  };

  const handleReset = () => {
    setGenres(
      formik.initialValues.genres.map((genre) => ({
        value: genre,
        label: genre,
      }))
    );
    formik.setValues(formik.initialValues);
  };

  const selectStyles = {
    control: (provided) => ({
      ...provided,
      borderColor: "transparent",
      boxShadow: "none",
      "&:hover": {
        borderColor: "transparent",
        boxShadow: "none",
      },
    }),
    option: (provided) => ({
      ...provided,
      color: "inherit",
      backgroundColor: "transparent",
      "&:active": {
        backgroundColor: "transparent",
      },
      "&:hover": {
        backgroundColor: "#424242",
      },
    }),
  };

  return (
    <form action="." method="GET" onSubmit={formik.handleSubmit}>
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
              value={formik.values.title}
              callback={(value) => formik.setFieldValue("title", value)}
            />
            {formik.errors.title && formik.touched.title ? (
              <p className="form-alert text-danger">{formik.errors.title}</p>
            ) : null}
          </label>
          <label className="label">
            <span className="label__caption">RELEASE DATE</span>
            <DatePicker
              selected={formik.values.release_date}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select Release Date"
              onChange={(value) => formik.setFieldValue("release_date", value)}
              onChangeRaw={(e) => e.preventDefault()}
            />
            {formik.errors.release_date && formik.touched.release_date ? (
              <p className="form-alert text-danger">
                {formik.errors.release_date}
              </p>
            ) : null}
          </label>
          <label className="label">
            <span className="label__caption">MOVIE URL</span>
            <FormControl
              type="text"
              placeholder="https://"
              value={formik.values.poster_path}
              callback={(value) => formik.setFieldValue("poster_path", value)}
            />
            {formik.errors.poster_path && formik.touched.poster_path ? (
              <p className="form-alert text-danger">
                {formik.errors.poster_path}
              </p>
            ) : null}
          </label>
          <label className="label">
            <span className="label__caption">RATING</span>
            <FormControl
              type="text"
              placeholder="from 1 to 10"
              value={formik.values.vote_average}
              callback={(value) => formik.setFieldValue("vote_average", value)}
            />
            {formik.errors.vote_average && formik.touched.vote_average ? (
              <p className="form-alert text-danger">
                {formik.errors.vote_average}
              </p>
            ) : null}
          </label>
          <label className="label">
            <span className="label__caption">GENRE</span>
            <ReactSelect
              options={genresOptionsForSelect}
              isMulti
              hideSelectedOptions={false}
              classNamePrefix="react-select"
              className="react-select"
              components={{
                Option,
              }}
              onChange={handleGenresSelect}
              allowSelectAll
              controlShouldRenderValue={false}
              value={selectedGenres}
              placeholder="Select Genres"
              styles={selectStyles}
              closeMenuOnSelect={false}
            />
            {formik.errors.genres && formik.touched.genres ? (
              <p className="form-alert text-danger">{formik.errors.genres}</p>
            ) : null}
          </label>
          <label className="label">
            <span className="label__caption">RUNTIME</span>
            <FormControl
              type="text"
              placeholder="Minutes"
              value={formik.values.runtime}
              callback={(value) => formik.setFieldValue("runtime", value)}
            />
            {formik.errors.runtime && formik.touched.runtime ? (
              <p className="form-alert text-danger">{formik.errors.runtime}</p>
            ) : null}
          </label>
        </div>
        <div className="film-modal__group">
          <label className="label">
            <span className="label__caption">OVERVIEW</span>
            <FormControl
              placeholder="Movie description"
              type="textarea"
              value={formik.values.overview}
              callback={(value) => formik.setFieldValue("overview", value)}
            />
            {formik.errors.overview && formik.touched.overview ? (
              <p className="form-alert text-danger">{formik.errors.overview}</p>
            ) : null}
          </label>
        </div>
      </div>
      <div className="modal__footer modal__footer--mt">
        <Button
          type="button"
          buttonStyle="btn--outline-danger"
          buttonSize="btn--lg"
          additionalClass="modal__btn font-weight-medium"
          onClick={handleReset}
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

export const FilmModalEditContainer = connect(
  null,
  mapDispatchToProps
)(FilmModalEdit);

FilmModalEdit.propTypes = {
  modalTitle: PropTypes.string.isRequired,
  id: PropTypes.number,
  sendFilmData: PropTypes.func.isRequired,
  closeModal: PropTypes.func,
};

FilmModalEdit.defaultProps = {
  id: null,
  closeModal: () => {},
};
