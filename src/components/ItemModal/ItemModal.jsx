import { useContext } from "react";

import "../Modal/Modal.css";
import "./ItemModal.css";
import Modal from "../Modal/Modal";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({
  handleCloseClick,
  card,
  name,
  isOpen,
  onDeleteItemClick,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;

  const itemDeleteButtonClassName = `modal__card-delete-btn ${
    isOwn ? "modal__card-delete-btn_visible" : "modal__card-delete-btn_hidden"
  }`;

  return (
    <Modal name={name} onClose={handleCloseClick} isOpen={isOpen}>
      <img src={card.imageUrl} alt={card.name} className="modal__image" />
      <div className="modal__card-caption">
        <div className="modal__card-info">
          <h3 className="modal__card-title">{card.name}</h3>
          <p className="modal__card-weather">Weather: {card.weather}</p>
        </div>
        <div className="modal__card-info-button">
          {
            (currentUser,
            isLoggedIn && (
              <button
                className={itemDeleteButtonClassName}
                type="button"
                onClick={onDeleteItemClick}
              >
                Delete item
              </button>
            ))
          }
        </div>
      </div>
    </Modal>
  );
}
export default ItemModal;
