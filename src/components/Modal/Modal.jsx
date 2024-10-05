import { useEffect } from "react";

import "./Modal.css";
import "../ModalWithForm/ModalWithForm.css";

function Modal({ name, onClose, children, isOpen }) {
  // here is `useEffect` for the `Escape` listener
  useEffect(() => {
    // we should define the handler inside `useEffect`, so that it wouldn’t lose the reference to be able to remove it
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  // here is the overlay handler
  const handleOverlay = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`modal ${isOpen && "modal_opened"}`}
      onClick={handleOverlay}
    >
      <div className={`modal__content modal__content_type_${name}`}>
        {children}
        <button
          className={`modal__close-btn_type_${name}`}
          type="button"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default Modal;
