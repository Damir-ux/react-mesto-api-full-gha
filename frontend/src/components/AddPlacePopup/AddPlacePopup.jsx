import useFormValidation from "../../utils/formValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import React from "react";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { valuen, errors, isValid, isInputValid, handleChange, reset } = useFormValidation();

  function resetClose() {
    onClose();
    reset();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ title: valuen.title, link: valuen.link }, reset);
  }

  return (
    <PopupWithForm
      name="popup-add"
      title="Новое место"
      isOpen={isOpen}
      onClose={resetClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        type="text"
        className={`popup__input popup__input_title ${
          isInputValid.title === undefined || isInputValid.title ? " " : "popup__input_error"
        }`}
        name="title"
        minLength={2}
        maxLength={30}
        required=""
        placeholder="Название"
        value={valuen.title}
        onChange={handleChange}
      />
      <span id="title-error" className="popup__input-error">
        {errors.title}
      </span>
      <input
        type="url"
        className={`popup__input popup__input_link ${
          isInputValid.link === undefined || isInputValid.link ? " " : "popup__input_error"
        }`}
        name="link"
        required=""
        placeholder="Ссылка на картинку"
        value={valuen.link}
        onChange={handleChange}
      />
      <span id="link-error" className="popup__input-error">
        {errors.link}
      </span>
    </PopupWithForm>
  );
}
