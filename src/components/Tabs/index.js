import React, { useState } from "react";
import PropTypes from "prop-types";
import { Tab } from "../Tab";

import "./Tabs.sass";

export const Tabs = ({ list, callback }) => {
  const [selectedTab, setSelectedTab] = useState(null);
  const changeSelectedTab = (name) => {
    callback(name);
    setSelectedTab(name);
  };
  return (
    <div className="tabs-list">
      {list.map(({ name }, index) => (
        <Tab
          key={name}
          name={name}
          isActive={selectedTab === null ? index === 0 : selectedTab === name}
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
  callback: PropTypes.func.isRequired,
};
