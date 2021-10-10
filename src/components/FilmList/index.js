import React, { useState } from "react";
import PropTypes from "prop-types";
import FilmItem from "../FilmItem";
import { FilmModalEdit } from "../FilmModalEdit";
import { ConfirmModal } from "../ConfirmModal";

const FilmList = ({ list }) => {
  const [isOpenEditModal, toggleEditModal] = useState(false);
  const openEditModal = () => {
    toggleEditModal(true);
  };
  const closeEditModal = () => {
    toggleEditModal(false);
  };

  const [isOpenDeleteModal, toggleDeleteModal] = useState(false);
  const openDeleteConfirm = () => {
    toggleDeleteModal(true);
  };
  const closeDeleteConfirm = () => {
    toggleDeleteModal(false);
  };

  const filmCardActions = [
    {
      name: "Edit",
      callback: openEditModal,
    },
    {
      name: "Delete",
      callback: openDeleteConfirm,
    },
  ];

  const count = list ? list.length : 0;
  return count ? (
    <>
      <p className="notification-caption">
        <span className="font-weight-semibold"> {count} </span>
        movies found
      </p>
      <div className="row">
        {list.map((item) => (
          <div key={item.title} className="row__item">
            <FilmItem
              title={item.title}
              genre={item.genre}
              releaseDate={item.releaseDate}
              actions={filmCardActions}
            />
          </div>
        ))}
      </div>
      <FilmModalEdit
        isDisplay={isOpenEditModal}
        closeCallback={closeEditModal}
        modalTitle="Edit movie"
        title="Moana"
        releaseDate="11/14/2016"
        url="https://www.moana.com"
        rating="7.6"
        genre="Some Genre"
        runtime="1h 47min"
        overview="Moana Waialiki is a sea voyaging enthusiast and the only daughter of a chief in a long line of navigators. When her island's fishermen can't catch any fish and the crops fail, she learns that the demigod Maui caused the blight by stealing the heart of the goddess, Te Fiti. The only way to heal the island is to persuade Maui to return Te Fiti's heart, so Moana sets off on an epic journey across the Pacific. The film is based on stories from Polynesian mythology."
      />
      <ConfirmModal
        isDisplay={isOpenDeleteModal}
        closeCallback={closeDeleteConfirm}
        confirmCallback={closeDeleteConfirm}
        modalTitle="Delete movie"
        modalDescr="Are you sure you want to delete this movie?"
      />
    </>
  ) : (
    <p>Films not found</p>
  );
};

FilmList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default FilmList;
