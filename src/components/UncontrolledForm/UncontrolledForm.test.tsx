import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { UncontrolledForm } from "./UncontrolledForm";

test("calls onSubmit with form data", async () => {
  const user = userEvent.setup();
  const handleSubmit = vi.fn();

  render(<UncontrolledForm onSubmit={handleSubmit} />);

  await user.type(screen.getByPlaceholderText("Name"), "Ivan");
  await user.type(screen.getByPlaceholderText("Email"), "ivan@test.com");
  await user.type(screen.getByPlaceholderText("Age"), "25");

  await user.click(screen.getByText("Send"));

  expect(handleSubmit).toHaveBeenCalledTimes(1);
});