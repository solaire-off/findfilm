import React, { useRef, useEffect, useCallback, useState } from "react";
import PropTypes from "prop-types";
import { addPropsToChildren, useDelayUnmount } from "../../Heplers";
import { useModalManagerActionContext } from "../../context/ModalManagerContext";

import "./Modal.sass";

export const ModalRoot = ({ children, additionalClass }) => {
  const setActiveModal = useModalManagerActionContext();

  const [isDisplay, toggleIsDisplay] = useState(true);
  const closeModal = () => {
    toggleIsDisplay(false);
  };

  const timeToModalFadeOut = 300;
  const isDisplayWithDelayUnmount = useDelayUnmount(
    isDisplay,
    timeToModalFadeOut
  );

  const checkIsDisplay = isDisplay ? "modal--show" : "";

  const ref = useRef(null);
  const handleClickOutside = useCallback(
    (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        closeModal();
      }
    },
    [ref]
  );

  const handleEscPress = useCallback((event) => {
    const { key } = event;
    if (key === "Escape") {
      closeModal();
    }
  });

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    document.addEventListener("keydown", handleEscPress);
    document.querySelector("html").classList.add("overflow-hidden");

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
      document.removeEventListener("keydown", handleEscPress, true);
      document.querySelector("html").classList.remove("overflow-hidden");

      // reset active modal in ModalManager
      // on unmouting current modal after animation delay
      if (!isDisplay) {
        setActiveModal({
          type: null,
        });
      }
    };
  }, [isDisplay, handleClickOutside, handleEscPress]);

  const childrenWithProps = addPropsToChildren(children, { closeModal });
  return (
    isDisplayWithDelayUnmount && (
      <div className={`modal ${additionalClass} ${checkIsDisplay}`}>
        <div className="modal__blocker" />
        <div ref={ref} className="modal__content">
          {childrenWithProps}
        </div>
      </div>
    )
  );
};

ModalRoot.propTypes = {
  children: PropTypes.node.isRequired,
  additionalClass: PropTypes.string,
};

ModalRoot.defaultProps = {
  additionalClass: "",
};
