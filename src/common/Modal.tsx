import { createPortal } from "react-dom";

interface ModalProps {
  children: React.ReactNode;
}

function Modal({ children }: ModalProps) {
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
          inlineSize: "500px",
          blockSize: "500px",
          background: "#fff",
          overflowY: "auto",
          padding: "1rem",
        }}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal")!,
  );
}

export default Modal;
