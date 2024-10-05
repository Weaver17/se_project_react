import { useState, useEffect } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({ isOpen, handleCloseClick }) => {
  return (
    <ModalWithForm
      title="Log In"
      name="login"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      buttonText="Log In"
      //   onSubmit={handleSubmit}
    >
      <label htmlFor="loginEmail" className="modal__label">
        Email*
        <input
          type="email"
          id="loginEmail"
          className="modal__input"
          placeholder="Email"
          required
        />
      </label>
      <label htmlFor="loginPassword" className="modal__label">
        Password*
        <input
          type="password"
          id="loginPassword"
          className="modal__input"
          placeholder="Password"
          required
        />
      </label>
      <button className="form__submit-btn form__submit-btn_type_go_to_sign_up">
        or Sign Up
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;
