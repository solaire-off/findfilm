import React from "react";
import PropTypes from 'prop-types';
import FilmItem from "../FilmItem";

const FilmList = ({ list }) => {
    if (list) {
        const count = list.length
        return (
            <>
                <p className="notification-caption">
                    <span className="font-weight-semibold">{count} </span>
                    movies found
                </p>
                <div className="row">
                    {list.map((item, index) =>
                        <div key={index} className="row__item">
                            <FilmItem
                                title={item.title}
                                genre={item.genre}
                                release_date={item.release_date}
                            />
                        </div>
                    )}
                </div>
            </>
        )
    }
}


FilmList.propTypes = {
    list: PropTypes.array
}

export default FilmList;
