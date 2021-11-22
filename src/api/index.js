import { API_ROOT } from "../Constants";
import fetch from "isomorphic-fetch";

export const fetchFilmByID = (filmID, callback) => {
  return fetch(`${API_ROOT}/movies/${filmID}`)
    .then((response) => response.json())
    .then((filmData) => {
      if (callback) {
        callback(filmData);
      }
    });
};

export const deleteFilmByID = (filmID, callback) => {
  fetch(`http://localhost:4000/movies/${filmID}`, {
    method: "DELETE",
  }).then((response) => {
    if (response.ok) {
      if (callback) {
        callback();
      }
    }
  });
};

export const sendFilmData = (values, id, successCallback) => {
  const fetchMethod = id ? "PUT" : "POST";
  const body = {
    title: values.title,
    poster_path: values.poster_path,
    genres: values.genres,
    runtime: parseInt(values.runtime, 10),
    overview: values.overview,
  };
  if (values.vote_average) {
    body.vote_average = parseFloat(values.vote_average);
  }
  if (values.release_date) {
    body.release_date = values.release_date.toLocaleDateString("en-CA");
  }
  if (id) {
    body.id = parseInt(id);
  }
  fetch(`${API_ROOT}/movies`, {
    method: fetchMethod,
    body: JSON.stringify(body),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        if (successCallback) {
          successCallback();
        }
      }
      return response.json();
    })
    // eslint-disable-next-line no-console
    .then((json) => console.log("Response:", JSON.stringify(json)));
};
