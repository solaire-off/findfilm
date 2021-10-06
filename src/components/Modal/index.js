import React, { useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDelayUnmount } from "../../Heplers"

import "./Modal.sass"

export const Modal = ({ isDisplay, children, additionalClass, closeCallback }) => {
    const timeToModalFadeOut = 300;
    const isDisplayWithDelayUnmount = useDelayUnmount(isDisplay, timeToModalFadeOut)
    const checkIsDisplay = isDisplay ? 'modal--show' : '';
    const checkAdditionalClass = additionalClass ? additionalClass : '';

    const ref = useRef(null)

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            closeCallback()
        }
    }

    const handleEscPress = (event) => {
        const key = event.key;
        if (key === "Escape") {
            closeCallback()
        }
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside, true)
        document.addEventListener('keydown', handleEscPress);
        if (isDisplayWithDelayUnmount) {
            document.querySelector('html').classList.add('overflow-hidden')
        }
        return () => {
            document.removeEventListener('click', handleClickOutside, true)
            document.removeEventListener('keydown', handleEscPress, true)
            document.querySelector('html').classList.remove('overflow-hidden')
        }
    }, [isDisplayWithDelayUnmount, handleClickOutside, handleEscPress])


    return (
        isDisplayWithDelayUnmount && (
            <div className={`modal ${checkAdditionalClass} ${checkIsDisplay}`}>
                <div className="modal__blocker"></div>
                <div ref={ref} className="modal__content">
                    {children}
                </div>
            </div>
        )
    )
}

Modal.propTypes = {
    children: PropTypes.node.isRequired,
    isDisplay: PropTypes.bool.isRequired,
    additionalClass: PropTypes.string,
    closeCallback: PropTypes.func.isRequired
}
