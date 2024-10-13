import { useState, useEffect } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const AddItemModal = ({ isOpen, onAddItem, handleCloseClick, isLoading }) => {
  const { values, handleChange, setValues } = useForm({
    name: "",
    imageUrl: "",
    weather: "",
  });

  useEffect(() => {
    if (isOpen) {
      setValues({
        name: "",
        imageUrl: "",
        weather: "",
      });
    }
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItem(values);
  };

  return (
    <ModalWithForm
      title="New garment"
      name="add_garment"
      buttonText={isLoading ? "Adding..." : "Add garment"}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      handleCloseClick={handleCloseClick}
    >
      <label className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          name="name"
          placeholder="Name"
          value={values.name}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          name="imageUrl"
          placeholder="Image URL"
          value={values.imageUrl}
          onChange={handleChange}
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
            name="weather"
            value="hot"
            checked={values.weather === "hot"}
            onChange={handleChange}
          />
          <div className="modal__radio-styled"></div>
          <p className="modal__radio-text">Hot</p>
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="warm"
            name="weather"
            value="warm"
            checked={values.weather === "warm"}
            onChange={handleChange}
          />
          <div className="modal__radio-styled"></div>
          <p className="modal__radio-text">Warm</p>
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            className="modal__radio-input"
            id="cold"
            name="weather"
            value="cold"
            checked={values.weather === "cold"}
            onChange={handleChange}
          />
          <div className="modal__radio-styled"></div>
          <p className="modal__radio-text">Cold</p>
        </label>
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
