import { Link } from "react-router-dom";
import React from "react";

export default function SectionLogin({ name, children, isValid, onSubmit }) {
  return (
    <>
      <section className="authorization__conteiner">
        <h1 className="authorization__title">{name === "signup" ? "Регистрация" : "Вход"}</h1>

        <input
          name={name}
          titleButton={name === "signup" ? "Регистрация" : "Войти"}
          children={children}
          isValid={isValid}
          onSubmit={onSubmit}
        />
        {name === "signup" && (
          <p className="register__text">
            Уже зарегистрированы?
            <Link to={"/sign-in"} className="register__button-exit">
              Войти
            </Link>
          </p>
        )}
      </section>
    </>
  );
}
