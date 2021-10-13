import React, { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

const ModalManagerContext = createContext();
const ModalManagerActionContext = createContext();

export const useModalManagerContext = () => useContext(ModalManagerContext);
export const useModalManagerActionContext = () =>
  useContext(ModalManagerActionContext);

export const ModalManagerProvider = ({ children }) => {
  const [activeModal, setActiveModal] = useState({
    type: null,
    props: null,
  });

  return (
    <ModalManagerContext.Provider value={activeModal}>
      <ModalManagerActionContext.Provider value={setActiveModal}>
        {children}
      </ModalManagerActionContext.Provider>
    </ModalManagerContext.Provider>
  );
};

ModalManagerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
