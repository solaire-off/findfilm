import React from 'react';
import './Button.sass'

const STYLES = [
    "btn--primary",
    "btn--outline-primary"
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
        <button onClick={onClick} type={type} className={`btn ${checkButtonStyle} ${checkButtonStyle} ${checkAdditionalClass}`} >
            {children}
        </button>
    )
}

export default Button;
