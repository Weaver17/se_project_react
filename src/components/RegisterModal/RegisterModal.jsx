import { useState, useEffect } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";

const RegisterModal = ({
  isOpen,
  handleCloseClick,
  handleRegistration,
  isLoading,
  handleLogInClick,
}) => {
  const [data, setData] = useState({
    name: "",
    password: "",
    email: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  };

  useEffect(() => {
    setData({ name: "", password: "", email: "", avatar: "" });
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
      <label htmlFor="sign-up-email" className="modal__label">
        Email*
        <input
          type="email"
          id="sign-up-email"
          name="sign-up-email"
          className="modal__input"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="sign-up-password" className="modal__label">
        Password*
        <input
          type="password"
          id="sign-up-password"
          name="sign-up-password"
          className="modal__input"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="sign-up-name" className="modal__label">
        Name*
        <input
          type="text"
          id="sign-up-name"
          name="sign-up-name"
          className="modal__input"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="sign-up-avatar" className="modal__label">
        Avatar URL*
        <input
          type="url"
          id="sign-up-avatar"
          name="sign-up-avatar"
          className="modal__input"
          placeholder="Avatar URL"
          value={data.avatar}
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
