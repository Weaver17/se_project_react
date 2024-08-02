import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import AddItemModal from "../AddItemModal/AddItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClothesClick = () => {
    setActiveModal("add_garment");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    currentTempUnit === "F" ? setCurrentTempUnit("C") : setCurrentTempUnit("F");
  };

  const handleEscapeClose = (e) => {
    if (e.key === "Escape") {
      closeActiveModal();
    }
  };

  const handleAddItemSubmit = (values) => {
    console.log(values);
    setActiveModal("");
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data, currentTempUnit);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="page">
      <CurrentTempUnitContext.Provider
        value={{ currentTempUnit, handleToggleSwitchChange }}
      >
        <div className="page__content">
          <Header
            handleAddClothesClick={handleAddClothesClick}
            weatherData={weatherData}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main
                  weatherData={weatherData}
                  handleCardClick={handleCardClick}
                />
              }
            />
            <Route path="profile" element={<Profile />} />
          </Routes>
          <Footer />
        </div>
      </CurrentTempUnitContext.Provider>
      <AddItemModal
        isOpen={activeModal === "add_garment"}
        onAddItem={handleAddItemSubmit}
        handleCloseClick={closeActiveModal}
        handleEscapeClose={handleEscapeClose}
      />
      <ItemModal
        name="preview"
        card={selectedCard}
        handleCloseClick={closeActiveModal}
        handleEscapeClose={handleEscapeClose}
        isOpen={activeModal === "preview"}
      />
    </div>
  );
}

export default App;
