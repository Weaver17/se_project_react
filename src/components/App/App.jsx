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
import { getItems, addItem, removeItem } from "../../utils/itemApi";
import DeleteModal from "../DeleteModal/DeleteModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
// import { setToken, getToken } from "../../utils/token";

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
  const [currentUser, setCurrentUser] = useState({});

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
    console.log(currentUser._id);

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

  const handleLogin = ({ email, password }) => {
    setIsLoading(true);
    console.log({ email, password });

    if (!email || !password) {
      return;
    }

    auth
      .authorize(email, password)
      .then((data) => {
        console.log(data);
        setIsLoggedIn(true);
        localStorage.setItem("jwt", data.token);
        console.log("Token set:", data.token);
        closeActiveModal();
        return auth.checkToken(data.token);
      })
      .then((userData) => {
        if (userData) {
          console.log(currentUser);

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
    console.log({ name, password, email, avatar });

    auth
      .register(name, password, email, avatar)
      .then((data) => {
        setIsLoggedIn(true);
        console.log("Sign Up successful:", data);
        if (!data.token) {
          throw new Error("No token returned from registration");
        }
        localStorage.setItem("jwt", data.token);
        return auth.checkToken(data.token);
      })
      .then((userData) => {
        if (userData && userData.name) {
          setCurrentUser({ name: userData.name });
        }
      })
      .then(() => {
        closeActiveModal();
      })
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEditProfile = ({ name, avatar }) => {
    const token = localStorage.getItem("jwt");
    console.log({ name, avatar });

    auth
      .editProfile({ name, avatar }, token)
      .then(() => {
        setCurrentUser({ name, avatar });
        console.log(currentUser);

        closeActiveModal();
      })
      .catch(console.error);
  };

  const handleLogOut = () => {
    localStorage.removeItem("jwt");
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

    const token = localStorage.getItem("jwt");

    if (!token) {
      console.log("No token found, skipping auth check.");
      return;
    }

    auth
      .checkToken(token)
      .then((user) => {
        setIsLoggedIn(true);
        setCurrentUser(user);
      })
      .catch(console.error);
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
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
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    isLoggedIn={isLoggedIn}
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      handleEditClick={handleEditClick}
                      handleLogOut={handleLogOut}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClothesClick={handleAddClothesClick}
                      itemToDelete={itemToDelete}
                      isLoggedIn={isLoggedIn}
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
          isLoggedIn={isLoggedIn}
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
