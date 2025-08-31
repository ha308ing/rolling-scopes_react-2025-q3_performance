import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

function Modal({ children, onClose }: ModalProps) {
  return createPortal(
    <div
      style={{
        position: "fixed",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        inset: 0,
        background: "#000c",
      }}
    >
      <div
        style={{
          maxInlineSize: "60vw",
          maxBlockSize: "60vh",
          background: "#fff",
          overflowY: "auto",
          padding: "1rem",
          position: "relative",
        }}
        className="box"
      >
        {children}
        <button
          onClick={onClose}
          className="button is-white"
          style={{ position: "absolute", top: 0, right: 0, margin: ".5rem" }}
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

export default Modal;
