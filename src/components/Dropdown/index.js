import React from "react";
import PropTypes from "prop-types";

import "./Dropdown.sass";

const Dropdown = ({ label, options }) => (
  <label className="dropdown-wrap">
    <p className="dropdown-wrap__label">{label}</p>
    <select className="dropdown">
      {options.map((item) => (
        <option key={item.value} value={item.value}>
          {item.name}
        </option>
      ))}
    </select>
  </label>
);

Dropdown.propTypes = {
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Dropdown;
