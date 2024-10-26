import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import "./App.css";

import CurrentUserContext from "../../contexts/CurrentUserContext";
import CurrentTempUnitContext from "../../contexts/CurrentTempUnitContext";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import AddItemModal from "../AddItemModal/AddItemModal";
import {
  getItems,
  addItem,
  removeItem,
  likeItem,
  unlikeItem,
} from "../../utils/itemApi";
import DeleteModal from "../DeleteModal/DeleteModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

import * as auth from "../../utils/auth";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    _id: "",
    username: "",
    email: "",
    avatar: "",
  });

  const navigate = useNavigate();

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClothesClick = () => {
    setActiveModal("add_garment");
  };

  const handleSignUpClick = () => {
    setActiveModal("register");
  };

  const handleLogInClick = () => {
    setActiveModal("login");
  };

  const handleEditClick = () => {
    setActiveModal("edit");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleToggleSwitchChange = () => {
    currentTempUnit === "F" ? setCurrentTempUnit("C") : setCurrentTempUnit("F");
  };

  const handleAddItemSubmit = (values) => {
    setIsLoading(true);
    const token = localStorage.getItem("JWT_TOKEN");

    const newItemDataWithOwner = {
      ...values,
      owner: currentUser?._id,
    };

    addItem(newItemDataWithOwner, token)
      .then((data) => {
        const { _id, name, imageUrl, weather, owner } = data;
        const newItemData = { _id, name, imageUrl, weather, owner };

        setClothingItems((clothingItems) => [newItemData, ...clothingItems]);
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
    const token = localStorage.getItem("JWT_TOKEN");
    const updatedItems = clothingItems.filter(
      (item) => item._id !== itemToDelete._id
    );
    removeItem(itemToDelete._id, token)
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

  const handleItemLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("JWT_TOKEN");

    if (!isLiked) {
      likeItem(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item?._id === id ? updatedCard : item))
          );
        })
        .catch(console.error);
    } else {
      unlikeItem(id, token)
        .then((updatedCard) => {
          setClothingItems((cards) =>
            cards.map((item) => (item?._id === id ? updatedCard : item))
          );
        })
        .catch(console.error);
    }
  };

  const handleLogin = ({ email, password }) => {
    setIsLoading(true);

    if (!email || !password) {
      return;
    }

    auth
      .authorize(email, password)
      .then((data) => {
        setIsLoggedIn(true);

        localStorage.setItem("JWT_TOKEN", data.token);
        closeActiveModal();

        return auth.checkToken(data.token);
      })
      .then((userData) => {
        if (userData) {
          setCurrentUser(userData);
        }
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRegistration = ({ name, password, email, avatar }) => {
    setIsLoading(true);

    auth
      .register(name, password, email, avatar)
      .then(() => {
        handleLogin({ email, password });
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEditProfile = (data) => {
    const token = localStorage.getItem("JWT_TOKEN");

    auth
      .editProfile(data, token)
      .then(() => {
        setCurrentUser(data);

        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogOut = () => {
    localStorage.removeItem("JWT_TOKEN");
    navigate("/");
    setIsLoggedIn(false);
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

    const token = localStorage.getItem("JWT_TOKEN");

    if (!token) {
      console.log("token not found, user is not logged in.");
      return;
    }

    auth
      .checkToken(token)
      .then((user) => {
        console.log(token);

        setCurrentUser(user);
        setIsLoggedIn(true);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, isLoggedIn, setIsLoggedIn }}
    >
      <div className="page">
        <CurrentTempUnitContext.Provider
          value={{ currentTempUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClothesClick={handleAddClothesClick}
              handleLogInClick={handleLogInClick}
              handleSignUpClick={handleSignUpClick}
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
                    setClothingItems={setClothingItems}
                    handleItemLike={handleItemLike}
                  />
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <Profile
                      handleEditClick={handleEditClick}
                      handleLogOut={handleLogOut}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      setClothingItems={setClothingItems}
                      handleAddClothesClick={handleAddClothesClick}
                      itemToDelete={itemToDelete}
                      handleItemLike={handleItemLike}
                    />
                  </ProtectedRoute>
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
          handleRegistration={handleRegistration}
          isLoading={isLoading}
          handleCloseClick={closeActiveModal}
          isOpen={activeModal === "register"}
          handleLogInClick={handleLogInClick}
        />
        <LoginModal
          handleLogin={handleLogin}
          handleCloseClick={closeActiveModal}
          isLoading={isLoading}
          isOpen={activeModal === "login"}
          handleSignUpClick={handleSignUpClick}
        />
        <EditProfileModal
          isOpen={activeModal === "edit"}
          handleCloseClick={closeActiveModal}
          isLoading={isLoading}
          handleEditProfile={handleEditProfile}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
