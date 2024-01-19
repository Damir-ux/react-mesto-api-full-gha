import React from "react";

export default function ImagePopup({ card, isOpen, onClose }) {
  return (
    <div className={`popup popup-cards ${isOpen && "popup_opened"}`} onClick={onClose}>
      <div className="popup__photo-container" onClick={(evt) => evt.stopPropagation()}>
        <button type="button" className="popup__close popup__close_cards" onClick={onClose} />
        <figure className="popup__figure">
          <img src={card.link} alt={`Карточка ${card.name}`} className="popup__photo" />
          <figcaption className="popup__photo-cap">{card.name}</figcaption>
        </figure>
      </div>
    </div>
  );
}
