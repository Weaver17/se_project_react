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
    setName(e.target.value);
  };

  const [imageUrl, setImageUrl] = useState("");

  const handleImageUrlChange = (e) => {
    setImageUrl(e.target.value);
  };

  const [weather, setWeather] = useState("");

  const handleWeather = (e) => {
    setWeather(e.target.id);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem({ name, imageUrl, weather });
    resetForm();
  };

  const resetForm = () => {
    setName("");
    setImageUrl("");
    setWeather("");
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
          required
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          id="imageUrl"
          placeholder="Image URL"
          value={imageUrl}
          onChange={handleImageUrlChange}
          required
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
            checked={weather === "hot"}
            onChange={handleWeather}
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
            checked={weather === "warm"}
            onChange={handleWeather}
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
            checked={weather === "cold"}
            onChange={handleWeather}
          />
          <div className="modal__radio-styled"></div>
          <p className="modal__radio-text">Cold</p>
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
