import React from "react";
import PropTypes from "prop-types";
import { Tab } from "../Tab";

import "./Tabs.sass";

export const Tabs = ({ list, callback, selectedTab }) => {
  const changeSelectedTab = (name) => {
    callback(name);
  };

  return (
    <div className="tabs-list">
      {list.map(({ name }) => (
        <Tab
          key={name}
          name={name}
          isActive={selectedTab === name}
          onClick={changeSelectedTab}
        />
      ))}
    </div>
  );
};

Tabs.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedTab: PropTypes.string.isRequired,
  callback: PropTypes.func.isRequired,
};
