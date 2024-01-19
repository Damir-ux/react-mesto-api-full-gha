import PopupWithForm from "../PopupWithForm/PopupWithForm";
import useformValidation from "../../utils/formValidation";
import { useRef } from "react";
import React from "react";

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const input = useRef();
  const { valuen, errors, isValid, isInputValid, handleChange, reset } = useformValidation();

  function resetClose() {
    onClose();
    reset();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({ avatar: input.current.value }, reset);
  }

  return (
    <PopupWithForm
      name="popup-avatar"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={resetClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        ref={input}
        type="url"
        className={`popup__input popup__input_avatar ${
          isInputValid.avatar === undefined || isInputValid.avatar ? " " : "popup__input_error"
        }`}
        name="avatar"
        required
        placeholder="Ссылка на картинку"
        value={valuen.avatar}
        onChange={handleChange}
      />
      <span id="avatar-error" className="popup__input-error">
        {errors.avatar}
      </span>
    </PopupWithForm>
  );
}
