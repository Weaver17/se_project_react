import { useState, useEffect, useContext } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({
  isOpen,
  handleCloseClick,
  isLoading,
  handleEditProfile,
}) => {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name || "");

  const [avatar, setAvatar] = useState(currentUser.avatar || "");

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile({ name, avatar });
  };

  useEffect(() => {
    setName(currentUser.name || "");
    setAvatar(currentUser.avatar || "");
  }, [isOpen]);

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      buttonText={isLoading ? "Saving..." : "Save Changes"}
      onSubmit={handleSubmit}
    >
      <label htmlFor="edit-name" className="modal__label">
        Name*
        <input
          type="text"
          id="edit-name"
          name="edit-name"
          className="modal__input"
          value={name}
          onChange={handleNameChange}
          required
        />
      </label>
      <label htmlFor="edit-avatar" className="modal__label">
        Avatar*
        <input
          type="url"
          id="edit-avatar"
          name="edit-avatar"
          className="modal__input"
          value={avatar}
          onChange={handleAvatarChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
