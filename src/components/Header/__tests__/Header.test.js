import React from "react";
import { render, act, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "..";
import { SITE_NAME } from "../../../Constants";
import { MemoryRouter } from "react-router-dom";
import { ModalManagerActionContext } from "../../../context/ModalManagerContext";

const mockHistoryReplace = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    replace: mockHistoryReplace,
  }),
}));

it("Current render default header", async () => {
  await act(async () => {
    render(
      <MemoryRouter initialentries={[{ pathname: "/search" }]}>
        <Header title={SITE_NAME} />
      </MemoryRouter>
    );
  });
  expect(document.body).toMatchSnapshot();
});

it("Current render header when open film info", async () => {
  await act(async () => {
    render(
      <MemoryRouter
        initialEntries={[{ hash: "", pathname: "/search", search: "?movie=1" }]}
        initialIndex={0}
      >
        <Header title={SITE_NAME} />
      </MemoryRouter>
    );
  });
  expect(document.body).toMatchSnapshot();
});

it("Work open modal", async () => {
  const mockOpenModal = jest.fn();
  await act(async () => {
    render(
      <MemoryRouter
        initialEntries={[{ hash: "", pathname: "/search" }]}
        initialIndex={0}
      >
        <ModalManagerActionContext.Provider value={mockOpenModal}>
          <Header title={SITE_NAME} />
        </ModalManagerActionContext.Provider>
      </MemoryRouter>
    );
  });
  userEvent.click(
    screen.getByRole("button", {
      name: "+ Add Movie",
    })
  );

  expect(mockOpenModal).toBeCalledTimes(1);
});

it("Change search params in history for close info about film", async () => {
  await act(async () => {
    render(
      <MemoryRouter
        initialEntries={[{ hash: "", pathname: "/search", search: "?movie=1" }]}
        initialIndex={0}
      >
        <Header title={SITE_NAME} />
      </MemoryRouter>
    );
  });

  userEvent.click(screen.getByLabelText(/close film info/i));

  expect(mockHistoryReplace).toBeCalledTimes(1);
});
