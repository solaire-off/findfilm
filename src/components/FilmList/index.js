import React, { useEffect } from "react";
import { connect } from "react-redux";
import { FilmItem } from "../FilmItem";
import { useFilmInfoActionContext } from "../../context/FilmInfoContext";
import { useModalManagerActionContext } from "../../context/ModalManagerContext";
import { fetchFilms } from "../../action/films";
import { FETCH_FILMS_COUNT } from "../../Constants";

const mapStateToProps = (store) => ({
  filmsList: store.films.list,
  filmsSelectedGenre: store.films.genre,
  filmsSelectedSort: store.films.sort,
});

const mapDispatchToProps = {
  fetchFilmsInState: (count) => fetchFilms(count),
};

export const FilmList = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ filmsList, fetchFilmsInState, filmsSelectedGenre, filmsSelectedSort }) => {
  const setActiveModal = useModalManagerActionContext();

  const toggleAddModal = (id) => {
    setActiveModal({
      type: "ADD_FILM",
      props: {
        modalTitle: "Edit movie",
        id,
      },
    });
  };

  const deleteMovieAndRefetch = (id) => {
    fetch(`http://localhost:4000/movies/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchFilmsInState(FETCH_FILMS_COUNT);
    });
  };

  const toggleDeleteModal = (id) => {
    setActiveModal({
      type: "CONFIRMATION",
      props: {
        confirmCallback: () => {
          deleteMovieAndRefetch(id);
        },
        modalTitle: "Delete movie",
        modalDescr: "Are you sure you want to delete this movie?",
      },
    });
  };

  const filmCardActions = [
    {
      name: "Edit",
      callback: toggleAddModal,
    },
    {
      name: "Delete",
      callback: toggleDeleteModal,
    },
  ];

  useEffect(() => {
    fetchFilmsInState(FETCH_FILMS_COUNT);
  }, [filmsSelectedGenre, filmsSelectedSort]);

  const count = filmsList ? filmsList.length : 0;

  const setSelectedFilm = useFilmInfoActionContext();

  return (
    <>
      <p className="notification-caption">
        <span className="font-weight-semibold"> {count} </span>
        movies found
      </p>
      {count && (
        <div className="row">
          {filmsList.map((item) => (
            <div key={item.title} className="row__item">
              <FilmItem
                id={item.id}
                title={item.title}
                genres={item.genres}
                thumbnail={item.poster_path}
                releaseDate={item.release_date}
                actions={filmCardActions}
                onClick={setSelectedFilm}
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
});
