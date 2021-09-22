import React from 'react';
import PropTypes from 'prop-types';

import './Footer.sass'

const Footer = ({ title }) => {
    return (
        <footer className="footer">
            <p className="footer__title">
                <span className="font-weight-black">{title[0]}</span>
                {title[1]}
            </p>
        </footer>
    )
}

Footer.propTypes = {
    title: PropTypes.array.isRequired
}

export default Footer
