import { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  name,
  handleCloseClick,
  handleEscapeClose,
  isOpen,
  onSubmit,
}) {
  const handleContentClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("keydown", handleEscapeClose);
    }

    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [isOpen, handleEscapeClose]);

  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__background" onClick={handleCloseClick}>
        <div
          className={`modal__content modal__content_type_${name}`}
          onClick={handleContentClick}
        >
          <button
            className="modal__close-btn"
            type="button"
            onClick={handleCloseClick}
          ></button>
          <h2 className="modal__title">{title}</h2>
          <form className="modal__form" name={name} onSubmit={onSubmit}>
            {children}
            <button
              className={`modal__submit-btn modal__submit-btn_type_${name}`}
              type="submit"
            >
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalWithForm;
