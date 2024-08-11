import "../Modal/Modal.css";
import "./ItemModal.css";
import Modal from "../Modal/Modal";

function ItemModal({
  handleCloseClick,
  card,
  // handleEscapeClose,
  name,
  isOpen,
  onDeleteItemClick,
}) {
  //   const handleContentClick = (e) => {
  //     e.stopPropagation();
  //   };

  //   useEffect(() => {
  //     if (isOpen) {
  //       document.addEventListener("keydown", handleEscapeClose);
  //     }

  //     return () => {
  //       document.removeEventListener("keydown", handleEscapeClose);
  //     };
  //   }, [isOpen, handleEscapeClose]);

  //   return (
  //     <div className={`modal ${isOpen && "modal_opened"}`}>
  //       <div className="modal__background" onClick={handleCloseClick}>
  //         <div
  //           className={`modal__content modal__content_type_${name}`}
  //           onClick={handleContentClick}
  //         >
  //           <button
  //             className="modal__close-btn modal__close-btn_type_preview"
  //             type="button"
  //             onClick={handleCloseClick}
  //           ></button>
  //           <img src={card.imageUrl} alt={card.name} className="modal__image" />
  //           <div className="modal__card-caption">
  //             <div className="modal__card-info">
  //               <h3 className="modal__card-title">{card.name}</h3>
  //               <p className="modal__card-weather">Weather: {card.weather}</p>
  //             </div>
  //             <div className="modal__card-info-button">
  //               <button
  //                 className="modal__card-delete"
  //                 type="button"
  //                 onClick={onDeleteItemClick}
  //               >
  //                 Delete item
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   );
  return (
    <Modal name={name} onClose={handleCloseClick} isOpen={isOpen}>
      <img src={card.imageUrl} alt={card.name} className="modal__image" />
      <div className="modal__card-caption">
        <div className="modal__card-info">
          <h3 className="modal__card-title">{card.name}</h3>
          <p className="modal__card-weather">Weather: {card.weather}</p>
        </div>
        <div className="modal__card-info-button">
          <button
            className="modal__card-delete"
            type="button"
            onClick={onDeleteItemClick}
          >
            Delete item
          </button>
        </div>
      </div>
    </Modal>
  );
}
export default ItemModal;
