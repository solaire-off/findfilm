import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { configureStore } from "./store";
import App from "./App";
import { fetchFilms } from "./action/films";
import { FETCH_FILMS_COUNT } from "./Constants";
import { ServerSideProvider } from "./context/ServerSideContext";
import { fetchFilmByID } from "./api";

function renderHTML(html, preloadedState) {
  return `<!doctype html>
      <html>
        <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Findfilm</title>
    
        <link rel="dns-prefetch" href="//fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;900&display=swap"
            rel="stylesheet">
        <link rel="stylesheet" href="/css/main.css">

        </head>
        <body>
          <div id="root">${html}</div>
          <script>window.PRELOADED_STATE = ${JSON.stringify(
            preloadedState
          ).replace(/</g, "\\u003c")}
          </script>
          <script src="/main.js"></script>
        </body>
      </html>
  `;
}

export default function serverRenderer() {
  return (req, res) => {
    const store = configureStore();

    const context = {};

    const renderRoot = (serverProps = null) => (
      <ServerSideProvider value={serverProps}>
        <App
          context={context}
          location={req.url}
          Router={StaticRouter}
          store={store}
        />
      </ServerSideProvider>
    );

    renderToString(renderRoot(serverSideProps));

    // context.url will contain the URL to redirect to if a <Redirect> was used
    if (context.url) {
      res.writeHead(302, {
        Location: context.url,
      });
      res.end();
      return;
    }

    const reqPath = req.path;
    let searchQuery = null;
    if (reqPath.includes("/search/")) {
      const splitPath = reqPath.split("/");
      if (splitPath.length === 3) {
        searchQuery = decodeURI(splitPath[2]);
      }
    }

    const queryString = Object.keys(req.query)
      .map((key) => key + "=" + req.query[key])
      .join("&");

    const emulateUseLocationWithSearch = {
      search: queryString,
    };

    const serverFetchList = [
      store.dispatch(
        fetchFilms(FETCH_FILMS_COUNT, emulateUseLocationWithSearch, searchQuery)
      ),
    ];

    const serverSideProps = {};

    if (req.query.movie) {
      serverFetchList.push(
        fetchFilmByID(req.query.movie, (filmData) => {
          serverSideProps.selectedFilm = filmData;
        })
      );
    }

    Promise.all(serverFetchList).then(() => {
      const htmlString = renderToString(renderRoot(serverSideProps));

      const preloadedState = store.getState();

      res.send(renderHTML(htmlString, preloadedState));
    });
  };
}
