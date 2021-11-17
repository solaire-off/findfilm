import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { FilmItem } from "../FilmItem";
import { useModalManagerActionContext } from "../../context/ModalManagerContext";
import { fetchFilms } from "../../action/films";
import { FETCH_FILMS_COUNT } from "../../Constants";
import { Button } from "../Button";
import { sendFilmData, deleteFilmByID } from "../../api";

const mapStateToProps = (store) => ({
  filmsList: store.films.list,
});

const mapDispatchToProps = {
  fetchFilmsInStore: (count, location, search) =>
    fetchFilms(count, location, search),
};

export const FilmList = connect(
  mapStateToProps,
  mapDispatchToProps
)(({ filmsList, fetchFilmsInStore }) => {
  const history = useHistory();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const { searchQuery } = useParams();

  const setActiveModal = useModalManagerActionContext();

  const toggleAddModal = (id) => {
    setActiveModal({
      type: "ADD_FILM",
      props: {
        modalTitle: "Edit movie",
        id,
        sendFilmData,
      },
    });
  };

  const deleteMovieAndRefetch = (id) => {
    deleteFilmByID(id, () => {
      fetchFilmsInStore(FETCH_FILMS_COUNT, location, searchQuery);
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
    fetchFilmsInStore(FETCH_FILMS_COUNT, location, searchQuery);
  }, [location, searchQuery]);

  const count = filmsList ? filmsList.length : 0;

  const setSelectedFilm = (id) => {
    query.set("movie", id);
    history.replace({ search: query.toString() });
  };

  const clearSearch = () => {
    history.replace({
      pathname: "/search",
      search: query.toString(),
    });
  };

  return (
    <>
      <p className="notification-caption">
        <span className="font-weight-semibold"> {count} </span>
        movies found
      </p>
      {count > 0 ? (
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
      ) : (
        <Button onClick={clearSearch} buttonStyle="btn--outline-danger">
          Clear search
        </Button>
      )}
    </>
  );
});
