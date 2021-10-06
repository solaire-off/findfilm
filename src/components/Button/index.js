import React from 'react';
import PropTypes from 'prop-types';

import './Button.sass'

const STYLES = [
    "btn--primary",
    "btn--outline-primary",
    "btn--outline-danger"
]

const SIZES = [
    "btn--sm",
    "btn--lg"
]

const Button = (
    {
        children,
        type,
        onClick,
        buttonStyle,
        buttonSize,
        additionalClass
    }
) => {
    const checkButtonStyle = STYLES.includes(buttonStyle) ? buttonStyle : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : '';
    const checkAdditionalClass = additionalClass ? additionalClass : ''
    return (
        <button onClick={onClick} type={type} className={`btn ${checkButtonStyle} ${checkButtonSize} ${checkAdditionalClass}`} >
            {children}
        </button>
    )
}

Button.propTypes = {
    children: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    buttonStyle: PropTypes.string,
    buttonSize: PropTypes.string,
    additionalClass: PropTypes.string
}

export default Button;
