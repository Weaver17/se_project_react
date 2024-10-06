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
      <label htmlFor="email" className="modal__label">
        Email*
        <input
          type="email"
          id="signUpEmail"
          name="email"
          className="modal__input"
          placeholder="Email"
          value={data.email}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="password" className="modal__label">
        Password*
        <input
          type="password"
          id="signUpPassword"
          name="password"
          className="modal__input"
          placeholder="Password"
          value={data.password}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="name" className="modal__label">
        Name*
        <input
          type="text"
          id="signUpName"
          name="name"
          className="modal__input"
          placeholder="Name"
          value={data.name}
          onChange={handleChange}
          required
        />
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL*
        <input
          type="url"
          id="signUpAvatar"
          name="avatar"
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
