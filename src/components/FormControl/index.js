import React from "react";
import PropTypes from "prop-types";

import "./FormControl.sass";

const STYLES = ["form-control--light"];

export const FormControl = ({
  type,
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
      placeholder={disabled ? null : placeholder}
      defaultValue={disabled ? null : value}
      disabled={disabled}
      onChange={(e) => callback(e.target.value)}
    />
  ) : (
    <textarea
      className={`${formControlClassName} form-control--textarea`}
      placeholder={disabled ? null : placeholder}
      defaultValue={disabled ? null : value}
      disabled={disabled}
      onChange={(e) => callback(e.target.value)}
    />
  );
};

FormControl.propTypes = {
  type: PropTypes.string,
  formControlStyle: PropTypes.string,
  placeholder: PropTypes.string,
  additionalClass: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disabled: PropTypes.bool,
  callback: PropTypes.func,
};

FormControl.defaultProps = {
  type: "text",
  formControlStyle: null,
  placeholder: null,
  additionalClass: null,
  value: null,
  disabled: false,
  callback: () => {},
};
