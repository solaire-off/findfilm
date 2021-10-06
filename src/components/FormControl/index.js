import React from "react";
import PropTypes from 'prop-types';

import "./FormControl.sass"

const STYLES = [
    "form-control--light",
]

const FormControl = ({
    type,
    formControlStyle,
    placeholder,
    additionalClass,
    value
}) => {
    const formControlIsInput = type === "text" ? true : false;
    const checkFormControlStyle = STYLES.includes(formControlStyle) ? formControlStyle : '';
    const formControlClassName = `form-control ${checkFormControlStyle} ${additionalClass ? additionalClass : ''}`

    return formControlIsInput
        ? <input className={formControlClassName} type="text" placeholder={placeholder} defaultValue={value}></input>
        : <textarea className={`${formControlClassName} form-control--textarea`} placeholder={placeholder} defaultValue={value}></textarea>
}

FormControl.propTypes = {
    children: PropTypes.string,
    type: PropTypes.string,
    formControlStyle: PropTypes.string,
    placeholder: PropTypes.string,
    additionalClass: PropTypes.string,
    value: PropTypes.string
}

export default FormControl
