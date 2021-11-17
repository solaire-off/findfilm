/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
import { useModalManagerContext } from "../../context/ModalManagerContext";
import { ModalRoot } from "../ModalRoot";
import { FilmModalEditContainer } from "../FilmModalEdit";
import { ConfirmModal } from "../ConfirmModal";

export const ModalManager = () => {
  const activeModal = useModalManagerContext();
  switch (activeModal.type) {
    case "ADD_FILM":
      return (
        <ModalRoot additionalClass="film-modal">
          <FilmModalEditContainer {...activeModal.props} />
        </ModalRoot>
      );
    case "CONFIRMATION":
      return (
        <ModalRoot additionalClass="confirm-modal">
          <ConfirmModal {...activeModal.props} />
        </ModalRoot>
      );
    default:
      return null;
  }
};
