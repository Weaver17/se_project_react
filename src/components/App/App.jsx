import { useState, useEffect } from "react";
import { Routes, Route, Form } from "react-router-dom";

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
import { getItems, addItem, removeItem } from "../../utils/itemApi";
import DeleteModal from "../DeleteModal/DeleteModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("login");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [itemToDelete, setItemToDelete] = useState({});
  const [isLoading, setIsLoading] = useState(false);

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

  const handleAddItemSubmit = (values) => {
    setIsLoading(true);
    addItem(values)
      .then((data) => {
        const { _id, name, imageUrl, weather } = data;
        const newItemData = { _id, name, imageUrl, weather };
        setClothingItems([newItemData, ...clothingItems]);
      })
      .then(() => {
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleDeleteItem = (card) => {
    setItemToDelete(card);
    setActiveModal("delete");
  };

  const handleDeleteConfirm = () => {
    setIsLoading(true);
    const updatedItems = clothingItems.filter(
      (item) => item._id !== itemToDelete._id
    );
    removeItem(itemToDelete._id)
      .then(setClothingItems(updatedItems))
      .then(() => {
        closeActiveModal();
      })
      .then(() => {
        setItemToDelete({});
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        setClothingItems(data);
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
                  clothingItems={clothingItems}
                />
              }
            />
            <Route
              path="profile"
              element={
                <Profile
                  handleCardClick={handleCardClick}
                  clothingItems={clothingItems}
                  handleAddClothesClick={handleAddClothesClick}
                  itemToDelete={itemToDelete}
                />
              }
            />
          </Routes>
          <Footer />
        </div>
      </CurrentTempUnitContext.Provider>
      <AddItemModal
        isOpen={activeModal === "add_garment"}
        isLoading={isLoading}
        onAddItem={handleAddItemSubmit}
        handleCloseClick={closeActiveModal}
      />
      <ItemModal
        name="preview"
        card={selectedCard}
        handleCloseClick={closeActiveModal}
        onDeleteItemClick={() => handleDeleteItem(selectedCard)}
        isOpen={activeModal === "preview"}
      />
      <DeleteModal
        isOpen={activeModal === "delete"}
        isLoading={isLoading}
        handleCloseClick={closeActiveModal}
        handleDeleteConfirm={handleDeleteConfirm}
      />
      <RegisterModal
        handleCloseClick={closeActiveModal}
        isOpen={activeModal === "register"}
      />
      <LoginModal
        handleCloseClick={closeActiveModal}
        isOpen={activeModal === "login"}
      />
    </div>
  );
}

export default App;
