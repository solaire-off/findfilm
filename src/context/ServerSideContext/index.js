import React, { createContext, useContext } from "react";
import PropTypes from "prop-types";

export const ServerSideContext = createContext(null);

export const useServerSideContext = () => useContext(ServerSideContext);

export const ServerSideProvider = ({ value, children }) => {
  return (
    <ServerSideContext.Provider value={value}>
      {children}
    </ServerSideContext.Provider>
  );
};

ServerSideProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
