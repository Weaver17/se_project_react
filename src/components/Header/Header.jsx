import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import "./Header.css";
import logo from "../../assets/WTWRLogo.svg";
import ToggleSwitch from "../ToggleTempSwitch/ToggleSwitch";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({
  handleAddClothesClick,
  weatherData,
  // isLoggedIn,
  handleLogInClick,
  handleSignUpClick,
}) {
  const { currentUser, isLoggedIn } = useContext(CurrentUserContext);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });
  const [isMobileMenuOpened, setMobileMenuOpened] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpened(!isMobileMenuOpened);
  };

  const handleAddClothesMobile = () => {
    handleAddClothesClick();
    setMobileMenuOpened(false);
  };

  const handleSignUpMobile = () => {
    handleSignUpClick();
    setMobileMenuOpened(false);
  };

  const handleLogInMobile = () => {
    handleLogInClick();
    setMobileMenuOpened(false);
  };

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="WTWR Logo" />
      </Link>
      <div className="header__main">
        <p className="header__date-location">
          {currentDate}, {weatherData.city}
        </p>
        <ToggleSwitch />

        <div className="header__right-wrapper">
          {
            (currentUser,
            isLoggedIn && (
              <button
                className="header__clothes-btn"
                type="button"
                onClick={handleAddClothesClick}
              >
                + Add clothes
              </button>
            ))
          }

          {isLoggedIn ? (
            <Link to="/profile" className="header__link">
              <div className="header__user-container">
                <p className="header__username">{currentUser?.name}</p>
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
              </div>
            </Link>
          ) : (
            <div className="header__button-container">
              <button
                type="button"
                className="header__signup-btn"
                onClick={handleSignUpClick}
              >
                Sign Up
              </button>
              <button
                type="button"
                className="header__login-btn"
                onClick={handleLogInClick}
              >
                Log In
              </button>
            </div>
          )}
        </div>
      </div>
      <button
        className="header__mobile-btn"
        type="button"
        onClick={toggleMobileMenu}
      ></button>

      {isMobileMenuOpened && (
        <div className="header__mobile">
          {isLoggedIn ? (
            <div className="header__mobile-info">
              <Link to="/profile" className="header__mobile-link">
                <div className="header__user-container">
                  <p className="header__username">{currentUser?.name}</p>
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
                </div>
              </Link>
              <button
                className="header__clothes-btn"
                type="button"
                onClick={handleAddClothesMobile}
              >
                + Add clothes
              </button>
              <button
                className="header__mobile-close-btn"
                type="button"
                onClick={toggleMobileMenu}
              ></button>
            </div>
          ) : (
            <div className="header__mobile-buttons">
              <button
                type="button"
                className="header__signup-btn"
                onClick={handleSignUpMobile}
              >
                Sign Up
              </button>
              <button
                type="button"
                className="header__login-btn"
                onClick={handleLogInMobile}
              >
                Log In
              </button>
              <button
                className="header__mobile-close-btn"
                type="button"
                onClick={toggleMobileMenu}
              ></button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;
