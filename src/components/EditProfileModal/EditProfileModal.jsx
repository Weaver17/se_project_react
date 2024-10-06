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
  const [name, setName] = useState({
    name: currentUser.name,
  });

  const [avatar, setAvatar] = useState({
    name: currentUser.avatar,
  });

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
    setName("");
    setAvatar("");
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
      <label htmlFor="editName" className="modal__label">
        Name*
        <input
          type="text"
          id="editName"
          className="modal__input"
          onChange={handleNameChange}
          required
        />
      </label>
      <label htmlFor="editAvatar" className="modal__label">
        Avatar*
        <input
          type="url"
          id="editAvatar"
          className="modal__input"
          onChange={handleAvatarChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
