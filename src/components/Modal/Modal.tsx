import type { ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
}

export function Modal({ children, onClose }: ModalProps) {
  return createPortal(
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 flex justify-center items-start pt-40"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="bg-white p-5 w-max rounded"
      >
        {children}
      </div>
    </div>,
    document.body
  );
}