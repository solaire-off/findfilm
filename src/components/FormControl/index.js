import React from "react";
import PropTypes from "prop-types";

import "./FormControl.sass";

const STYLES = ["form-control--light"];

export const FormControl = ({
  type,
  name,
  formControlStyle,
  placeholder,
  additionalClass,
  value,
  disabled,
  callback,
}) => {
  const formControlIsInput = type !== "textarea";
  const checkFormControlStyle = STYLES.includes(formControlStyle)
    ? formControlStyle
    : "";
  const formControlClassName = `form-control ${checkFormControlStyle} ${
    additionalClass || ""
  }`;

  return formControlIsInput ? (
    <input
      className={formControlClassName}
      type={type}
      name={name}
      placeholder={disabled ? null : placeholder}
      value={disabled ? "" : value || ""}
      disabled={disabled}
      onChange={(e) => callback(e.target.value)}
    />
  ) : (
    <textarea
      className={`${formControlClassName} form-control--textarea`}
      name={name}
      placeholder={disabled ? null : placeholder}
      value={disabled ? "" : value || ""}
      disabled={disabled}
      onChange={(e) => callback(e.target.value)}
    />
  );
};

FormControl.propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  formControlStyle: PropTypes.string,
  placeholder: PropTypes.string,
  additionalClass: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  callback: PropTypes.func,
};

FormControl.defaultProps = {
  type: "text",
  name: null,
  formControlStyle: null,
  placeholder: null,
  additionalClass: null,
  value: "",
  disabled: false,
  callback: () => {},
};
