import React from 'react';

import './Hero.sass'

import heroBanner from './../../assets/images/header.jpg'
import heroBanner2x from './../../assets/images/header@2x.jpg'

const Hero = ({ children, title }) => {
    return (
        <div className="hero">
            <picture>
                <img className="hero__bg"
                    srcSet={`${heroBanner} 1x, ${heroBanner2x} 2x`}
                    src={heroBanner}
                    alt="Film List" />
            </picture>
            <div className="container">
                <div className="hero__content">
                    <p className="hero__title font-weight-light">{title}</p>
                    {children ? (
                        <div className="hero__in">
                            {children}
                        </div>
                    ) : null}

                </div>
            </div>
        </div>
    )
}

export default Hero;
