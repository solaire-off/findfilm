import React from "react";
import { render, act, screen, fireEvent } from "@testing-library/react";
import { ModalRoot } from "..";
import { ModalManagerProvider } from "../../../context/ModalManagerContext";
import userEvent from "@testing-library/user-event";

const componentCaption = "test caption";
const Something = () => <span>{componentCaption}</span>;

it("wrapper existed", async () => {
  await act(async () => {
    render(
      <ModalRoot>
        <Something />
      </ModalRoot>
    );
  });
  expect(screen.getByText(componentCaption)).toBeInTheDocument();
});

it("content provided", async () => {
  await act(async () => {
    render(
      <ModalRoot>
        <Something />
      </ModalRoot>
    );
  });
  expect(screen.getByRole("dialog")).toBeInTheDocument();
  expect(screen.getByRole("document")).toBeInTheDocument();
});

it("close on press esc", async () => {
  jest.useFakeTimers();

  await act(async () => {
    render(
      <ModalManagerProvider>
        <ModalRoot>
          <Something />
        </ModalRoot>
      </ModalManagerProvider>
    );
  });

  fireEvent.keyDown(screen.getByRole("document"), {
    key: "Escape",
    code: "Escape",
    keyCode: 27,
    charCode: 27,
  });

  act(() => {
    jest.runAllTimers();
  });

  expect(screen.queryByRole("document")).not.toBeInTheDocument();
});

it("doesn't close on press every key except esc", async () => {
  jest.useFakeTimers();

  await act(async () => {
    render(
      <ModalManagerProvider>
        <ModalRoot>
          <Something />
        </ModalRoot>
      </ModalManagerProvider>
    );
  });

  fireEvent.keyDown(screen.getByRole("document"), {
    key: "Enter",
    code: "Enter",
    keyCode: 13,
    charCode: 13,
  });

  act(() => {
    jest.runAllTimers();
  });

  expect(screen.queryByRole("document")).toBeInTheDocument();
});

it("close on click outside modal content", async () => {
  jest.useFakeTimers();

  await act(async () => {
    render(
      <ModalManagerProvider>
        <ModalRoot>
          <Something />
        </ModalRoot>
      </ModalManagerProvider>
    );
  });

  userEvent.click(screen.getByRole("dialog"));

  act(() => {
    jest.runAllTimers();
  });

  expect(screen.queryByRole("document")).not.toBeInTheDocument();
});

it("doesn't close on click inside modal content", async () => {
  jest.useFakeTimers();

  await act(async () => {
    render(
      <ModalManagerProvider>
        <ModalRoot>
          <Something />
        </ModalRoot>
      </ModalManagerProvider>
    );
  });

  userEvent.click(screen.getByRole("document"));

  act(() => {
    jest.runAllTimers();
  });

  expect(screen.queryByRole("document")).toBeInTheDocument();
});
