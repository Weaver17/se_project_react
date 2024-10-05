import { useState, useEffect } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({ isOpen, handleCloseClick }) => {
  return (
    <ModalWithForm
      title="Sign Up"
      name="register"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      buttonText="Sign Up"
      //   onSubmit={handleSubmit}
    >
      <label htmlFor="signUpEmail" className="modal__label">
        Email*
        <input
          type="email"
          id="signUpEmail"
          className="modal__input"
          placeholder="Email"
          required
        />
      </label>
      <label htmlFor="signUpPassword" className="modal__label">
        Password*
        <input
          type="password"
          id="signUpPassword"
          className="modal__input"
          placeholder="Password"
          required
        />
      </label>
      <label htmlFor="signUpName" className="modal__label">
        Name*
        <input
          type="text"
          id="signUpName"
          className="modal__input"
          placeholder="Name"
          required
        />
      </label>
      <label htmlFor="signUpAvatar" className="modal__label">
        Avatar URL*
        <input
          type="url"
          id="signUpAvatar"
          className="modal__input"
          placeholder="Avatar URL"
          required
        />
      </label>
      <button className="form__submit-btn form__submit-btn_type_go_to_login">
        or Log In
      </button>
    </ModalWithForm>
  );
};

export default RegisterModal;
