import React from "react";
import { components } from "react-select";

export const Option = (props) => {
  // eslint-disable-next-line react/prop-types
  const { isSelected, label } = props;
  return (
    <div>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <components.Option {...props}>
        <input type="checkbox" checked={isSelected} onChange={() => null} />
        <label>{label}</label>
      </components.Option>
    </div>
  );
};
