import { memo } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  return createPortal(
    <div className="modal-container">
      <div className="box modal-content">
        {children}
        <button
          onClick={onClose}
          className="button is-white modal-close-button"
          type="button"
        >
          <span className="icon is-small">
            <i className="fas fa-times"></i>
          </span>
        </button>
      </div>
    </div>,
    document.getElementById("modal")!,
  );
}

export default memo(Modal);
