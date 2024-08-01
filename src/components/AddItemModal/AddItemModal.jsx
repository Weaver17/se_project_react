import { useState } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({
  isOpen,
  onAddItem,
  handleCloseClick,
  handleEscapeClose,
}) => {
  const [name, setName] = useState("");

  const handleNameChange = (e) => {
    console.log(e.target.value);
    setName(e.target.value);
  };

  const [image, setImage] = useState("");

  const handleImageChange = (e) => {
    console.log(e.target.value);
    setImage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, image });
  };

  return (
    <ModalWithForm
      title="New garment"
      name="add_garment"
      buttonText="Add garment"
      isOpen={isOpen}
      onSubmit={handleSubmit}
      handleCloseClick={handleCloseClick}
      handleEscapeClose={handleEscapeClose}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={image}
          onChange={handleImageChange}
        />
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="hot"
            name="radio-input"
          />
          <div className="modal__radio-styled"></div>
          <p className="modal__radio-text">Hot</p>
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="warm"
            name="radio-input"
          />
          <div className="modal__radio-styled"></div>
          <p className="modal__radio-text">Warm</p>
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="cold"
            name="radio-input"
          />
          <div className="modal__radio-styled"></div>
          <p className="modal__radio-text">Cold</p>
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
