import React from "react";
import PropTypes from "prop-types";

import "./Footer.sass";

export const Footer = ({ title }) => (
  <footer className="footer">
    <p className="footer__title">
      <span className="font-weight-black">{title[0]}</span>
      {title[1]}
    </p>
  </footer>
);

Footer.propTypes = {
  title: PropTypes.arrayOf(PropTypes.string).isRequired,
};
