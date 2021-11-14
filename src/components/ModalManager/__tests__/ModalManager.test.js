import React from "react";
import { render, act, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../store";
import { MemoryRouter } from "react-router-dom";
import { ModalManagerContext } from "../../../context/ModalManagerContext";
import { ModalManager } from "..";

it("Render 'ADD_FILM' modal by context value", async () => {
  const title = "Add movie";

  await act(async () => {
    render(
      <MemoryRouter initialentries={[{ pathname: "/search" }]}>
        <Provider store={store}>
          <ModalManagerContext.Provider
            value={{
              type: "ADD_FILM",
              props: {
                modalTitle: title,
                id: null,
                sendFilmData: () => {},
              },
            }}
          >
            <ModalManager />
          </ModalManagerContext.Provider>
        </Provider>
      </MemoryRouter>
    );
  });
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(screen.getByRole("document")).toBeInTheDocument();
  expect(screen.getByText(title)).toBeInTheDocument();
});

it("Render 'CONFIRMATION' modal by context value", async () => {
  const title = "Delete movie";
  await act(async () => {
    render(
      <ModalManagerContext.Provider
        value={{
          type: "CONFIRMATION",
          props: {
            confirmCallback: () => {},
            modalTitle: title,
            modalDescr: "Are you sure you want to delete this movie?",
          },
        }}
      >
        <ModalManager />
      </ModalManagerContext.Provider>
    );
  });
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(screen.getByRole("document")).toBeInTheDocument();
  expect(screen.getByText(title)).toBeInTheDocument();
});

it("doesn't render if undefined type", async () => {
  await act(async () => {
    render(
      <ModalManagerContext.Provider
        value={{
          type: "any-undefined-type",
        }}
      >
        <ModalManager />
      </ModalManagerContext.Provider>
    );
  });
  expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  expect(screen.queryByRole("document")).not.toBeInTheDocument();
});
