import React from "react";
import PropTypes from "prop-types";
import Button from "../Button";

import "./ConfirmModal.sass";

export const ConfirmModal = ({
  confirmCallback,
  modalTitle,
  modalDescr,
  closeModal,
}) => {
  const confirmation = () => {
    confirmCallback();
    closeModal();
  };
  return (
    <>
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
        <div className="modal__text">
          <p>{modalDescr}</p>
        </div>
      </div>
      <div className="modal__footer modal__footer--mt-sm">
        <Button
          type="button"
          buttonStyle="btn--primary"
          buttonSize="btn--lg"
          additionalClass="modal__btn font-weight-medium"
          onClick={confirmation}
        >
          Confirm
        </Button>
      </div>
    </>
  );
};

ConfirmModal.propTypes = {
  confirmCallback: PropTypes.func.isRequired,
  closeModal: PropTypes.func,
  modalTitle: PropTypes.string.isRequired,
  modalDescr: PropTypes.string.isRequired,
};

ConfirmModal.defaultProps = {
  closeModal: () => {},
};
