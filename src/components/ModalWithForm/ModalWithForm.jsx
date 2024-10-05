import { useEffect } from "react";

import "./ModalWithForm.css";
import Modal from "../Modal/Modal";
import Form from "../Form/Form";

function ModalWithForm({
  children,
  buttonText,
  title,
  name,
  handleCloseClick,
  isOpen,
  onSubmit,
}) {
  return (
    <Modal name={name} onClose={handleCloseClick} isOpen={isOpen}>
      <h2 className={`modal__title modal__title_type_${name}`}>{title}</h2>
      <Form name={name} onSubmit={onSubmit} buttonText={buttonText}>
        {children}
      </Form>
    </Modal>
  );
}

export default ModalWithForm;
