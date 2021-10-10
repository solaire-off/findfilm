import React from "react";
import PropTypes from "prop-types";
import Tab from "../Tab";

import "./Tabs.sass";

const Tabs = ({ list }) => (
  <div className="tabs-list">
    {list.map(({ name, isActive }) => (
      <Tab key={`${name}`} name={name} isActive={isActive} />
    ))}
  </div>
);

Tabs.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      isActive: PropTypes.bool.isRequired,
    })
  ).isRequired,
};

export default Tabs;
