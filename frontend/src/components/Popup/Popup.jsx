import React from "react";

import { useEffect, useCallback } from "react";

function Popup({ isOpen, onClose, type, ...props }) {
  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === "Escape") {
        onClose();
      }
    }
    if (isOpen) {
      document.addEventListener("keydown", handleEscClose);
      return () => document.removeEventListener("keydown", handleEscClose);
    }
  }, [onClose, isOpen]);

  const closeByClickOnOverlay = useCallback(
    (evt) => {
      if (evt.target === evt.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );
  return (
    <div
      className={`popup ${isOpen ? "popup_opened" : ""} popup__container-tooltip`}
      onMouseDown={closeByClickOnOverlay}
    >
      <div className={`popup__container popup__container_type_${type}`}>
        {props.children}
        <button type="button" className="popup__close" onClick={onClose} />
      </div>
    </div>
  );
}

export default Popup;
