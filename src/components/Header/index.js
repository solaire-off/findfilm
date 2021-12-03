import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../Button";
import { useModalManagerActionContext } from "../../context/ModalManagerContext";
import { sendFilmData } from "../../api";
import { useQuery } from "../../Heplers";
import "./Header.sass";

export const Header = ({ title }) => {
  const setActiveModal = useModalManagerActionContext();
  const toggleAddModal = () => {
    setActiveModal({
      type: "ADD_FILM",
      props: {
        modalTitle: "Add movie",
        sendFilmData,
      },
    });
  };

  const query = useQuery();
  const location = useLocation();

  const selectedFilmID = query.get("movie");

  query.delete("movie");
  const searchParamWithourMovie = query.toString();

  return (
    <>
      <header className="header">
        <div className="container">
          <div className="header__in">
            <Link className="header__title" to="/search">
              <span className="font-weight-black">{title[0]}</span>
              {title[1]}
            </Link>
            {!selectedFilmID ? (
              <Button
                onClick={toggleAddModal}
                type="button"
                buttonStyle="btn--outline-primary"
              >
                + Add Movie
              </Button>
            ) : (
              <Link
                to={{
                  pathname: location.pathname,
                  search: searchParamWithourMovie,
                }}
                type="button"
                className="icon-btn"
                aria-label="Close film info"
              >
                <svg
                  className="icon-btn__image"
                  width="29"
                  height="30"
                  viewBox="0 0 29 30"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="18.5"
                    cy="10.5"
                    r="9.5"
                    stroke="#F65261"
                    strokeWidth="2"
                  />
                  <path
                    d="M10.5 19.5L1.5 28.5"
                    stroke="#F65261"
                    strokeWidth="2"
                    strokeLinecap="square"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
};

Header.propTypes = {
  title: PropTypes.arrayOf(PropTypes.string).isRequired,
};
