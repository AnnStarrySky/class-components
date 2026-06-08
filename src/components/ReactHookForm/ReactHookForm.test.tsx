import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { ReactHookForm } from "./ReactHookForm";

test("submits valid data", async () => {
  const user = userEvent.setup();
  const handleSubmit = vi.fn();

  render(<ReactHookForm onSubmit={handleSubmit} />);

  await user.type(screen.getByPlaceholderText("Name"), "Ivan");
  await user.type(screen.getByPlaceholderText("Email"), "ivan@test.com");
  await user.type(screen.getByPlaceholderText("Age"), "25");

  await user.click(screen.getByText("Send"));

  expect(handleSubmit).toHaveBeenCalled();
});