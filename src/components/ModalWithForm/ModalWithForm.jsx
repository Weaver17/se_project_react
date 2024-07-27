import { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  name,
  activeModal,
  handleCloseClick,
  handleEscapeClose,
  isOpen,
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
  }, [activeModal]);

  return (
    <div className={`modal ${activeModal === "add_garment" && "modal_opened"}`}>
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
          <form className="modal__form" name={name}>
            {children}
            <button className="modal__submit-btn" type="submit">
              {buttonText}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ModalWithForm;
