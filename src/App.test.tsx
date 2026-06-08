import { test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

test("renders buttons", () => {
  render(<App />);

  expect(screen.getByRole("button", { name: /open uncontrolled form/i })).toBeInTheDocument();

  expect(screen.getByRole("button", { name: /open react hook form/i })).toBeInTheDocument();
});

test("opens uncontrolled modal", () => {
  render(<App />);

  fireEvent.click(
    screen.getByRole("button", { name: /open uncontrolled form/i })
  );

  expect(screen.getByText("Uncontrolled Form")).toBeInTheDocument();
});

test("opens react hook form modal", () => {
  render(<App />);

  fireEvent.click(screen.getByRole("button", { name: /open react hook form/i }));

  expect(
    screen.getByText("React Hook Form")).toBeInTheDocument();
});