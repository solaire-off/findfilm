import React from "react";
import FilmItem from "../FilmItem";

const FilmList = ({ list }) => {
    if (list) {
        return (
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
        )
    }
}

export default FilmList;
