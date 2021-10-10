import React from "react";
import PropTypes from "prop-types";
import { Modal } from "../Modal";
import Button from "../Button";

import "./ConfirmModal.sass";

export const ConfirmModal = ({
  isDisplay,
  closeCallback,
  confirmCallback,
  modalTitle,
  modalDescr,
}) => (
  <Modal
    isDisplay={isDisplay}
    additionalClass="confirm-modal"
    closeCallback={closeCallback}
  >
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
        onClick={confirmCallback}
      >
        Confirm
      </Button>
    </div>
  </Modal>
);

ConfirmModal.propTypes = {
  isDisplay: PropTypes.bool.isRequired,
  closeCallback: PropTypes.func.isRequired,
  confirmCallback: PropTypes.func.isRequired,
  modalTitle: PropTypes.string.isRequired,
  modalDescr: PropTypes.string.isRequired,
};
