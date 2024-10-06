import { useContext } from "react";
// import { useNavigate } from "react-router-dom";

import "./Sidebar.css";
import avatar from "../../assets/avatar.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Sidebar({ handleEditClick, handleLogOut }) {
  const currentUser = useContext(CurrentUserContext);

  // const navigate = useNavigate();

  // const logOut = () => {
  //   localStorage.removeItem("jwt");
  //   navigate("/");
  //   setIsLoggedIn(false);
  // };

  const handleLogOutClick = (e) => {
    e.preventDefault();
    handleLogOut();
  };

  return (
    <div className="sidebar">
      <div className="sidebar__user-container">
        {currentUser?.avatar ? (
          <img
            className="header__user-avatar"
            src={currentUser?.avatar}
            alt="User Avatar"
          />
        ) : (
          <div className="header__user-no-avatar">
            {currentUser?.name?.[0]?.toUpperCase()}
          </div>
        )}
        <p className="sidebar__username">{currentUser?.name}</p>
      </div>

      <button type="button" className="sidebar__edit" onClick={handleEditClick}>
        Change profile data
      </button>
      <button
        type="button"
        className="sidebar__logout"
        onClick={handleLogOutClick}
      >
        Log out
      </button>
    </div>
  );
}

export default Sidebar;
