import React from 'react';
import PropTypes from 'prop-types';

import './Header.sass'

const Header = ({ children, title }) => {
    return (
        <>
            <header className="header">
                <div className="container">
                    <div className="header__in">
                        <p className="header__title">
                            <span className="font-weight-black">{title[0]}</span>
                            {title[1]}
                        </p>
                        {children}
                    </div>
                </div>
            </header>
        </>
    )
}

Header.propTypes = {
    title: PropTypes.array.isRequired
}

export default Header;
