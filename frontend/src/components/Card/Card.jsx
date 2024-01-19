import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";
import Like from "../Like/Like.jsx";
import React from "react";

export default function Card({ card, onCardClick, onDelete }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="photo-grid__item">
      {currentUser._id === card.owner._id && (
        <button className="photo-grid__trash" type="button" onClick={() => onDelete(card._id)} />
      )}

      <img
        src={card.link}
        alt={`Картинка ${card.name}`}
        className="photo-grid__image"
        onClick={() => onCardClick({ link: card.link, name: card.name })}
      />
      <div className="photo-grid__signature">
        <h2 className="photo-grid__text">{card.name}</h2>
        <Like likes={card.likes} myid={currentUser._id} cardid={card._id} />
        {/* <button className="photo-grid__button" type="button" />
        <span className="photo-grid__counter">{card.likes.length}</span> */}
      </div>
    </div>
  );
}
