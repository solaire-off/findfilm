import React from "react";

import "./FormControl.sass"

const STYLES = [
    "form-control--light",
]

const FormControl = ({
    children,
    type,
    formControlStyle,
    placeholder,
    additionalClass
}) => {
    const formControlIsInput = type === "text" ? true : false;
    const checkFormControlStyle = STYLES.includes(formControlStyle) ? formControlStyle : '';
    const formControlClassName = `form-control ${checkFormControlStyle} ${additionalClass}`

    if (formControlIsInput) {
        return (
            <input className={formControlClassName} type="text" placeholder={placeholder}></input>
        )
    }
    return <textarea className={formControlClassName} placeholder={placeholder}>{children}</textarea>
}

export default FormControl
