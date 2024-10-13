import { useEffect, useContext } from "react";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useForm } from "../../hooks/useForm";

const EditProfileModal = ({
  isOpen,
  handleCloseClick,
  isLoading,
  handleEditProfile,
}) => {
  const currentUser = useContext(CurrentUserContext);

  const currentUserData = currentUser.currentUser;

  const { values, handleChange, setValues } = useForm({
    email: currentUserData.email,
    _id: currentUserData._id,
    name: "",
    avatar: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile(values);
  };

  useEffect(() => {
    if (isOpen && currentUser) {
      setValues({
        email: currentUserData.email,
        _id: currentUserData._id,
        name: currentUserData.name,
        avatar: currentUserData.avatar,
      });
    }
  }, [isOpen, currentUser]);

  return (
    <ModalWithForm
      title="Change profile data"
      name="edit"
      isOpen={isOpen}
      handleCloseClick={handleCloseClick}
      buttonText={isLoading ? "Saving..." : "Save Changes"}
      onSubmit={handleSubmit}
    >
      <label className="modal__label">
        Name*{" "}
        <input
          type="text"
          name="name"
          className="modal__input"
          value={values.name || ""}
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label">
        Avatar*{" "}
        <input
          type="url"
          name="avatar"
          className="modal__input"
          value={values.avatar || ""}
          onChange={handleChange}
          required
        />
      </label>
    </ModalWithForm>
  );
};

export default EditProfileModal;
