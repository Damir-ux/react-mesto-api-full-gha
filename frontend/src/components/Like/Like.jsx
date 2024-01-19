import { useEffect, useState } from "react";
import api from "../../utils/api";
import React from "react";

export default function Like({ likes, myid, cardid }) {
  const [isLike, setIsLike] = useState(false);
  const [count, setCount] = useState(likes.length);

  useEffect(() => {
    setIsLike(likes.some((element) => myid === element._id));
  }, [likes, myid]);

  function handleCardLike() {
    if (isLike) {
      api
        .removeLike(cardid, localStorage.jwt)
        .then((res) => {
          setIsLike(false);
          setCount(res.likes.length);
        })
        .catch((err) => console.error(`Ошибка снятия лайка ${err}`));
    } else {
      api
        .addLike(cardid, localStorage.jwt)
        .then((res) => {
          setIsLike(true);
          setCount(res.likes.length);
        })
        .catch((err) => console.error(`Ошибка установки лайка ${err}`));
    }
  }

  return (
    <>
      <button
        className={`photo-grid__button ${isLike && "photo-grid__button_active"}`}
        type="button"
        onClick={handleCardLike}
      />
      <span className="photo-grid__counter">{count}</span>
    </>
  );
}
