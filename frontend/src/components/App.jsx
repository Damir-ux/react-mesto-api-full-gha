import React, { useState, useEffect, useCallback } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Main from "./Main/Main.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import ProtectedRouteElement from "./ProtectedRoute/ProtectedRoute.jsx";
import Register from "./Register/Register.jsx";
import Login from "./Login/Login.jsx";
import * as authApi from "../utils/authApi.js";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import AppLayout from "./AppLayout/AppLayout.jsx";
import Preloader from "./Preloader/Preloader.jsx";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setImagePopup] = useState(false);

  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [infoTooltipStatus, setInfoTooltipStatus] = useState("");
  const [isInfoTooltipPopupOpen, setInfoTooltipPopupClass] = useState(false);

  const [isPreloaderActive, setPreloaderClass] = useState(true);
  const [isLoading, setLoading] = useState(false);

  const navigate = useNavigate();

  const [currentUser, setCurrentUser] = useState({});
  const [cards, setUserCards] = useState([]);
  const [deleteId, setDeleteId] = useState("");

  const setCloseAllPopupups = useCallback(() => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopup(false);
    setDeletePopupOpen(false);
    setInfoTooltipPopupClass(false);
    setInfoTooltipStatus("");
  }, []);

  const closePopupEsc = useCallback(
    (evt) => {
      if (evt.key === "Escape") {
        setCloseAllPopupups();
        document.removeEventListener("keydown", closePopupEsc);
      }
    },
    [setCloseAllPopupups]
  );

  const closeAllPopups = useCallback(() => {
    setCloseAllPopupups();
    document.removeEventListener("keydown", closePopupEsc);
  }, [setCloseAllPopupups, closePopupEsc]);

  function setEventListenerDoc() {
    document.addEventListener("keydown", closePopupEsc);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setEventListenerDoc();
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEventListenerDoc();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEventListenerDoc();
  }

  function handleDelete(cardId) {
    setDeleteId(cardId);
    setDeletePopupOpen(true);
    setEventListenerDoc();
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopup(true);
    setEventListenerDoc();
  }

  useEffect(() => {
    loggedIn &&
      Promise.all([api.getInfo(localStorage.token), api.getCards(localStorage.token)])
        .then(([dataUser, dataCard]) => {
          setCurrentUser(dataUser);
          setUserCards(dataCard);
        })
        .catch((err) => console.error(`Ошибка загрузки исходных данных ${err}`));
  }, [loggedIn]);

  function handleDel(evt) {
    evt.preventDefault();
    api
      .deleteCard(deleteId, localStorage.token)
      .then(() => {
        setUserCards(
          cards.filter((card) => {
            return card._id !== deleteId;
          })
        );
        closeAllPopups();
      })
      .catch((err) => console.error(`Ошибка удаления картинки ${err}`));
  }

  function handleUpdateUser(dataUser, reset) {
    api
      .setUserInfo(dataUser, localStorage.token)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((err) => console.error(`Ошибка обновления профиля ${err}`));
  }

  function handleUpdateAvatar(dataCard, reset) {
    api
      .setAvatar(dataCard, localStorage.token)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch((err) => console.error(`Ошибка обновления аватара ${err}`));
  }

  function handleAddPlaceSubmit(dataCard, reset) {
    api
      .addCard(dataCard, localStorage.token)
      .then((res) => {
        setUserCards([res, ...cards]);
        closeAllPopups();
        reset();
      })
      .catch((err) => console.error(`Ошибка добавления карточки ${err}`));
  }

  const handleUserRegistration = useCallback(
    async (userData) => {
      setLoading(true);
      try {
        const data = await authApi.register(userData);
        if (data) {
          setInfoTooltipStatus("success");
          setInfoTooltipPopupClass(true);
          navigate("/sign-in", { replace: true });
        }
      } catch (err) {
        console.error(err);
        setInfoTooltipStatus("fail");
        setInfoTooltipPopupClass(true);
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const handleUserAuthorization = useCallback(
    async (userData) => {
      setLoading(true);
      try {
        const data = await authApi.authorize(userData);
        if (data.token) {
          localStorage.setItem("token", data.token);
          setLoggedIn(true);
          setUserEmail(userData.email);
          navigate("/", { replace: true });
        }
      } catch (err) {
        console.error(err);
        setInfoTooltipStatus("fail");
        setInfoTooltipPopupClass(true);
      } finally {
        setLoading(false);
      }
    },
    [navigate]
  );

  const handleUserLogOut = useCallback(() => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUserEmail("");
    navigate("/sign-in", { replace: true });
  }, [navigate]);

  const tokenCheck = useCallback(async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const user = await authApi.getContent(token);
        if (!user) {
          throw new Error("Данные пользователя отсутствует");
        }
        setUserEmail(user.data.email);
        setLoggedIn(true);
        navigate("/", { replace: true });
      } catch (err) {
        console.error(err);
      } finally {
        setPreloaderClass(false);
      }
    } else {
      setPreloaderClass(false);
    }
  }, [navigate]);

  useEffect(() => {
    tokenCheck();
  }, [tokenCheck]);

  if (isPreloaderActive) {
    return <Preloader isActive={isPreloaderActive} />;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Routes>
          <Route path="/" element={<AppLayout email={userEmail} onLogOut={handleUserLogOut} />}>
            <Route
              index
              element={
                <ProtectedRouteElement
                  element={Main}
                  cards={cards}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onDelete={handleDelete}
                  loggedIn={loggedIn}
                />
              }
            />
            <Route
              path="/sign-in"
              element={<Login onLogin={handleUserAuthorization} onLoading={isLoading} />}
            />
            <Route
              path="/sign-up"
              element={<Register onRegistr={handleUserRegistration} onLoading={isLoading} />}
            />
          </Route>
        </Routes>
        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />

        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
        />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
        />

        <PopupWithForm
          name="popup_type_delete"
          title="Вы уверены?"
          titleButton="Да"
          isOpen={isDeletePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleDel}
        />

        <InfoTooltip
          isOpen={isInfoTooltipPopupOpen}
          onClose={closeAllPopups}
          status={infoTooltipStatus}
        />

        <ImagePopup card={selectedCard} isOpen={isImagePopup} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
