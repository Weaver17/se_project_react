import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import "./App.css";

import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import ItemCard from "../ItemCard/ItemCard";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import AddItemModal from "../AddItemModal/AddItemModal";
import { getItems, addItem, removeItem } from "../../utils/itemApi";
import DeleteModal from "../DeleteModal/DeleteModal";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTempUnit, setCurrentTempUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [itemToDelete, setItemToDelete] = useState({});

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
    setItemToDelete(card);
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
    addItem(values)
      .then((data) => {
        const { _id, name, imageUrl, weather } = data;
        const newItemData = { _id, name, imageUrl, weather };
        setClothingItems([newItemData, ...clothingItems]);
      })
      .then(setActiveModal(""))
      .catch((err) => {
        console.error(`Failed to add item: ${err}`);
      });
  };

  const handleDeleteItem = (card) => {
    setItemToDelete(card);
    setActiveModal("delete");
  };

  const handleDeleteConfirm = () => {
    const updatedItems = clothingItems.filter(
      (item) => item._id !== itemToDelete._id
    );
    removeItem(itemToDelete._id)
      .then(setClothingItems(updatedItems))
      .then(setActiveModal(""))
      .then(setItemToDelete({}))
      .catch((err) => {
        console.error(`Failed to delete item: ${err}`);
      });
  };

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data, currentTempUnit);
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
        onAddItem={handleAddItemSubmit}
        handleCloseClick={closeActiveModal}
        handleEscapeClose={handleEscapeClose}
      />
      <ItemModal
        name="preview"
        card={selectedCard}
        handleCloseClick={closeActiveModal}
        handleEscapeClose={handleEscapeClose}
        onDeleteItemClick={() => handleDeleteItem(selectedCard)}
        isOpen={activeModal === "preview"}
      />
      <DeleteModal
        isOpen={activeModal === "delete"}
        handleCloseClick={closeActiveModal}
        handleDeleteConfirm={handleDeleteConfirm}
      />
    </div>
  );
}

export default App;
