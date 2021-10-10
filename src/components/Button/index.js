import React from "react";
import PropTypes from "prop-types";

import "./Button.sass";

const STYLES = ["btn--primary", "btn--outline-primary", "btn--outline-danger"];

const SIZES = ["btn--sm", "btn--lg"];

const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  additionalClass,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : "";
  return (
    <button
      onClick={onClick}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={`btn ${checkButtonStyle} ${checkButtonSize} ${additionalClass}`}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["submit", "button", "reset"]),
  onClick: PropTypes.func,
  buttonStyle: PropTypes.string,
  buttonSize: PropTypes.string,
  additionalClass: PropTypes.string,
};

Button.defaultProps = {
  type: "button",
  onClick: () => {},
  buttonStyle: "btn--primary",
  buttonSize: "",
  additionalClass: "",
};

export default Button;
