import { useEffect } from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

export function Modal({ children, onClose }: ModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return createPortal(
    <div
      data-testid="modal-overlay"
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex justify-center items-start pt-40"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-5 w-max rounded"
      >
        {children}
      </div>
    </div>,
    document.body
  );
}