import React from "react";

export default function PopupWithForm({
  name,
  title,
  children,
  isOpen,
  onClose,
  onSubmit,
  isValid = true,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`} onClick={onClose}>
      <div className="popup__container" onClick={(evt) => evt.stopPropagation()}>
        <button type="button" className="popup__close" onClick={onClose} />
        <div className="popup__content">
          <h3 className="popup__title">{title}</h3>
          <form className="popup__form" name={name} noValidate="" onSubmit={onSubmit}>
            {children}
            <input
              type="submit"
              className={`popup__button ${isValid ? "" : "popup__button_disabled"} `}
              defaultValue="Сохранить"
            />
          </form>
        </div>
      </div>
    </div>
  );
}
