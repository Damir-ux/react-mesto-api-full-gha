import useformValidation from "../../utils/formValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import { useContext, useEffect } from "react";
import React from "react";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { valuen, errors, isValid, isInputValid, handleChange, reset, setValue } =
    useformValidation();

  useEffect(() => {
    setValue("name", currentUser.name);
    setValue("profession", currentUser.about);
  }, [currentUser, setValue]);

  function resetClose() {
    onClose();
    reset({ name: currentUser.name, profession: currentUser.about });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ name: valuen.name, profession: valuen.profession }, reset);
  }

  return (
    <PopupWithForm
      name="profile-popup"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={resetClose}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        className={`popup__input popup__input_type_name ${
          isInputValid.username === undefined || isInputValid.username ? "" : "popup__input_error"
        }`}
        name="name"
        minLength={2}
        maxLength={40}
        // defaultValue
        required
        value={valuen.name ? valuen.name : ""}
        onChange={handleChange}
      />
      <span id="name-error" className="popup__input-error">
        {errors.name}
      </span>
      <input
        type="text"
        className={`popup__input popup__input_type_profession ${
          isInputValid.profession === undefined || isInputValid.profession
            ? ""
            : "popup__input_error"
        }`}
        name="profession"
        minLength={2}
        maxLength={200}
        // defaultValue
        required
        value={valuen.profession ? valuen.profession : ""}
        onChange={handleChange}
      />
      <span id="profession-error" className="popup__input-error">
        {errors.profession}
      </span>
    </PopupWithForm>
  );
}
