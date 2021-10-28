import React from "react";
import PropTypes from "prop-types";

export const Tab = ({ name, isActive, onClick }) => {
  const checkTabIsActive = isActive ? "tabs-list__item--active" : "";
  return (
    <button
      type="button"
      className={`tabs-list__item ${checkTabIsActive}`}
      onClick={() => onClick(name)}
    >
      {name}
    </button>
  );
};

Tab.propTypes = {
  name: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};
