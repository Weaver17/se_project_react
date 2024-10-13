import { useState, useEffect } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useForm } from "../../hooks/useForm";

const RegisterModal = ({
  isOpen,
  handleCloseClick,
  handleRegistration,
  isLoading,
  handleLogInClick,
}) => {
  const { values, handleChange, setValues } = useForm({
    name: "",
    password: "",
    email: "",
    avatar: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(values);
  };

  useEffect(() => {
    if (isOpen) {
      setValues({ name: "", password: "", email: "", avatar: "" });
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Sign Up"
      name="register"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      buttonText={isLoading ? "..." : "Sign Up"}
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
      <label className="modal__label">
        Name*
        <input
          type="text"
          name="name"
          className="modal__input"
          placeholder="Name"
          value={values.name || ""}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Avatar URL*
        <input
          type="url"
          name="avatar"
          className="modal__input"
          placeholder="Avatar URL"
          value={values.avatar || ""}
          onChange={handleChange}
          required
        />
      </label>
      <button
        type="button"
        className="form__submit-btn form__submit-btn_type_go_to_login"
        onClick={handleLogInClick}
      >
        or Log In
      </button>
    </ModalWithForm>
  );
};

export default RegisterModal;
