import { render, screen } from "@testing-library/react";
import { Modal } from "./Modal";
import userEvent from "@testing-library/user-event";

test("renders modal content", () => {
  render(
    <Modal onClose={() => {}}>
      Test Modal
    </Modal>
  );

  expect(screen.getByText("Test Modal")).toBeInTheDocument();
});

test("closes modal on ESC", async () => {
  const user = userEvent.setup();
  const handleClose = vi.fn();

  render(
    <Modal onClose={handleClose}>
      Test Modal
    </Modal>
  );

  await user.keyboard("{Escape}");

  expect(handleClose).toHaveBeenCalledTimes(1);
});

test("closes modal on overlay click", async () => {
  const user = userEvent.setup();
  const handleClose = vi.fn();

  render(
    <Modal onClose={handleClose}>
      <div>Test Modal</div>
    </Modal>
  );

  await user.click(screen.getByTestId("modal-overlay"));

  expect(handleClose).toHaveBeenCalledTimes(1);
});