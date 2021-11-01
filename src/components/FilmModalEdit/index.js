import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import DatePicker from "react-datepicker";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactSelect from "react-select";
import { fetchFilms } from "../../action/films";
import { FormControl } from "../FormControl";
import { Button } from "../Button";
import { FETCH_FILMS_COUNT, GENRES_LIST } from "../../Constants";
import { Option } from "../Option";
import "./FilmModal.sass";

const FilmSchema = Yup.object().shape({
  title: Yup.string()
    .min(2, "The minimum length of the title is 2 characters.")
    .required("Required field."),
  vote_average: Yup.number()
    .nullable()
    .typeError("Rating is required number.")
    .min(1, "The minimum rating of the film is 1.")
    .max(10, "The maximum rating of the film is 10."),
  release_date: Yup.date().nullable().default(null),
  poster_path: Yup.string()
    .url("Movie url must be a valid url.")
    .required("Required field."),
  overview: Yup.string()
    .min(10, "Minimum length of the overview is 10 characters.")
    .required("Required field."),
  runtime: Yup.number()
    .typeError("Runtime must be a number.")
    .min(1, "Minimum length of runtime is 1 minute.")
    .required("Required field."),
  genres: Yup.array().min(1, "At least one genre is required"),
});
const mapDispatchToProps = {
  fetchFilmsInState: (count) => fetchFilms(count),
};

export const FilmModalEdit = connect(
  null,
  mapDispatchToProps
)(({ modalTitle, id, closeModal, fetchFilmsInState }) => {
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [selectedGenres, setGenres] = useState([]);

  const fetchFilmByID = (filmID) => {
    fetch(`http://localhost:4000/movies/${filmID}`)
      .then((response) => response.json())
      .then((filmData) => {
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
      fetchFilmByID(id);
    }
  }, [id]);

  const sendFilmData = (values) => {
    const fetchMethod = id ? "PUT" : "POST";
    const body = {
      title: values.title,
      poster_path: values.poster_path,
      genres: values.genres,
      runtime: parseInt(values.runtime, 10),
      overview: values.overview,
    };
    if (values.vote_average) {
      body.vote_average = parseFloat(values.vote_average);
    }
    if (values.release_date) {
      body.release_date = values.release_date.toLocaleDateString("en-CA");
    }
    if (id) {
      body.id = id;
    }
    fetch("http://localhost:4000/movies", {
      method: fetchMethod,
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          closeModal();
          fetchFilmsInState(FETCH_FILMS_COUNT);
        }
        return response.json();
      })
      // eslint-disable-next-line no-console
      .then((json) => console.log("Response:", JSON.stringify(json)));
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
    onSubmit: sendFilmData,
    enableReinitialize: true,
  });

  const genresOptionsForSelect = formik.initialValues.genres
    .concat(
      GENRES_LIST.filter(
        (genre) => formik.initialValues.genres.indexOf(genre) < 1
      )
    )
    .map((genre) => ({
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
          type="reset"
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
});

FilmModalEdit.propTypes = {
  modalTitle: PropTypes.string.isRequired,
  id: PropTypes.number,
  closeModal: PropTypes.func,
};

FilmModalEdit.defaultProps = {
  id: null,
  closeModal: () => {},
};
