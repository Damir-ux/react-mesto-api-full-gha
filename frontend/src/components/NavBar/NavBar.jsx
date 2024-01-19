import React from "react";
import { Link, Route, Routes } from "react-router-dom";

function NavBar({ email, onLogOut }) {
  return (
    <div className="header__nav">
      <Routes>
        <Route
          path="/sign-up"
          element={
            <Link to="/sign-in" className="header__link">
              Войти
            </Link>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link to="/sign-up" className="header__link">
              Регистрация
            </Link>
          }
        />
        <Route
          path="/"
          element={
            <>
              <p className="header__user-email">{email || ""}</p>
              <button type="button" className="header__btn-sign-out" onClick={onLogOut}>
                Выйти
              </button>
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default NavBar;
