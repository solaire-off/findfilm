import React from 'react';

import './Footer.sass'

const Footer = ({ title }) => {
    return (
        <footer class="footer">
            <p className="footer__title">
                <span className="font-weight-black">{title[0]}</span>
                {title[1]}
            </p>
        </footer>
    )
}

export default Footer
