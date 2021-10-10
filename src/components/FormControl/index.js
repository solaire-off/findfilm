import React from "react";
import PropTypes from "prop-types";

import "./FormControl.sass";

const STYLES = ["form-control--light"];

const FormControl = ({
  type,
  formControlStyle,
  placeholder,
  additionalClass,
  value,
}) => {
  const formControlIsInput = type === "text";
  const checkFormControlStyle = STYLES.includes(formControlStyle)
    ? formControlStyle
    : "";
  const formControlClassName = `form-control ${checkFormControlStyle} ${
    additionalClass || ""
  }`;

  return formControlIsInput ? (
    <input
      className={formControlClassName}
      type="text"
      placeholder={placeholder}
      defaultValue={value}
    />
  ) : (
    <textarea
      className={`${formControlClassName} form-control--textarea`}
      placeholder={placeholder}
      defaultValue={value}
    />
  );
};

FormControl.propTypes = {
  type: PropTypes.string,
  formControlStyle: PropTypes.string,
  placeholder: PropTypes.string,
  additionalClass: PropTypes.string,
  value: PropTypes.string,
};

FormControl.defaultProps = {
  type: "text",
  formControlStyle: "",
  placeholder: "",
  additionalClass: "",
  value: "",
};

export default FormControl;
