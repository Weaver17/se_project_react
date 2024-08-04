import "./DeleteModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function DeleteModal({ isOpen, handleCloseClick, handleDeleteConfirm }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    handleDeleteConfirm();
  };
  return (
    <ModalWithForm
      name="delete"
      isOpen={isOpen}
      buttonText="Yes, delete item"
      handleCloseClick={handleCloseClick}
      onSubmit={handleSubmit}
    >
      <h3 className="modal__delete-warning">
        Are you sure you want to delete this item?
        <br /> This action is irreversible.
      </h3>
      <button
        className="modal__delete-cancel"
        type="button"
        onClick={handleCloseClick}
      >
        Cancel
      </button>
    </ModalWithForm>

    // <div className={`modal ${isOpen && "modal_opened"}`}>
    //   <div className="modal__background">
    //     <div className={`modal__content modal__content_type_${name}`}>
    //       <button
    //         className="modal__close-btn modal__close-btn_type_delete"
    //         type="button"
    //         onClick={handleCloseClick}
    //       ></button>
    //       <h3 className="modal__delete-warning">
    //         Are you sure you want to delete this item?
    //         <br /> This action is irreversible.
    //       </h3>
    //       <button className="modal__delete-confirm" type="button">
    //         Yes, delete item
    //       </button>
    //       <button
    //         className="modal__delete-cancel"
    //         type="button"
    //         onClick={handleCloseClick}
    //       >
    //         Cancel
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}

export default DeleteModal;
