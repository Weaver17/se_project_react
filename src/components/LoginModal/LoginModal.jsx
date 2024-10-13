import { useState, useEffect } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const LoginModal = ({
  isOpen,
  handleCloseClick,
  handleSignUpClick,
  isLoading,
  handleLogin,
}) => {
  const { values, handleChange, setValues } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values);
  };

  useEffect(() => {
    if (isOpen) {
      setValues({ email: "", password: "" });
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Log In"
      name="login"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      buttonText={isLoading ? "..." : "Sign In"}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Email*
        <input
          type="email"
          name="email"
          className="modal__input"
          placeholder="Email"
          value={values.email || ""}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Password*
        <input
          type="password"
          name="password"
          className="modal__input"
          placeholder="Password"
          value={values.password || ""}
          onChange={handleChange}
          required
        />
      </label>
      <button
        type="button"
        className="form__submit-btn form__submit-btn_type_go_to_sign_up"
        onClick={handleSignUpClick}
      >
        or Sign Up
      </button>
    </ModalWithForm>
  );
};

export default LoginModal;
