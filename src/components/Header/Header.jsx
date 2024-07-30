import { useState } from "react";
import "./Header.css";
import logo from "../../assets/WTWRLogo.svg";
import avatar from "../../assets/avatar.svg";
import ToggleSwitch from "../ToggleTempSwitch/ToggleSwitch";

function Header({ handleAddClothesClick, weatherData }) {
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

  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="WTWR Logo" />
      <div className="header__main">
        <p className="header__date-location">
          {currentDate}, {weatherData.city}
        </p>
        <div className="header__right-wrapper">
          <ToggleSwitch />
          <button
            className="header__clothes-btn"
            type="button"
            onClick={handleAddClothesClick}
          >
            + Add clothes
          </button>
          <div className="header__user-container">
            <p className="header__username">Username</p>
            <img
              className="header__user-avater"
              src={avatar}
              alt="User Avatar"
            />
          </div>
        </div>
      </div>
      <button
        className="header__mobile-btn"
        type="button"
        onClick={toggleMobileMenu}
      ></button>

      {isMobileMenuOpened && (
        <div className="header__mobile">
          <div className="header__user-container">
            <p className="header__username">Username</p>
            <img
              className="header__user-avatar"
              src={avatar}
              alt="User Avatar"
            />
          </div>
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
      )}
    </header>
  );
}

export default Header;
