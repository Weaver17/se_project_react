import { useEffect } from "react";
import "./ItemModal.css";

function ItemModal({
  activeModal,
  handleCloseClick,
  card,
  handleEscapeClose,
  name,
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
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__background" onClick={handleCloseClick}>
        <div
          className={`modal__content modal__content_type_${name}`}
          onClick={handleContentClick}
        >
          <button
            className="modal__close-btn modal__close-btn_type_preview"
            type="button"
            onClick={handleCloseClick}
          ></button>
          <img src={card.link} alt={card.name} className="modal__image" />
          <div className="modal__card-info">
            <h3 className="modal__card-title">{card.name}</h3>
            <p className="modal__card-weather">Weather: {card.weather}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ItemModal;
