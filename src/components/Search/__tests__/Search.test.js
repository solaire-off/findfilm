import React from "react";
import { render, act, screen } from "@testing-library/react";
import { generatePath } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Search } from "..";
import { MemoryRouter } from "react-router-dom";

const mockHistoryReplace = jest.fn();
const searchValue = "test";
const nextSearchValue = "some film name";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useHistory: () => ({
    replace: mockHistoryReplace,
  }),
  useParams: () => ({
    searchQuery: searchValue,
  }),
}));

afterEach(() => {
  jest.clearAllMocks();
});

it("Getting value from search params and pass to input", async () => {
  await act(async () => {
    render(
      <MemoryRouter
        initialentries={[
          {
            pathname: "/search",
          },
        ]}
      >
        <Search />
      </MemoryRouter>
    );
  });

  const input = screen.getByPlaceholderText("What do you want to watch?");

  expect(input).toHaveValue(searchValue);
});

it("Search input value is change if type", async () => {
  await act(async () => {
    render(
      <MemoryRouter initialentries={[{ pathname: `/search` }]}>
        <Search />
      </MemoryRouter>
    );
  });

  const input = screen.getByPlaceholderText("What do you want to watch?");

  userEvent.clear(input);

  userEvent.type(input, nextSearchValue);

  expect(input).toHaveValue(nextSearchValue);
});

it("Search form call history replace with value when send", async () => {
  await act(async () => {
    render(
      <MemoryRouter initialentries={[{ pathname: `/search` }]}>
        <Search />
      </MemoryRouter>
    );
  });

  const input = screen.getByPlaceholderText("What do you want to watch?");
  const button = screen.getByRole("button");

  userEvent.clear(input);
  userEvent.type(input, nextSearchValue);
  userEvent.click(button);

  expect(mockHistoryReplace.mock.calls.length).toEqual(1);
});

it("Search form call history replace without value when send", async () => {
  await act(async () => {
    render(
      <MemoryRouter initialentries={[{ pathname: `/search` }]}>
        <Search />
      </MemoryRouter>
    );
  });

  const input = screen.getByPlaceholderText("What do you want to watch?");
  const button = screen.getByRole("button");

  userEvent.clear(input);
  userEvent.click(button);

  expect(mockHistoryReplace.mock.calls.length).toEqual(1);
});
