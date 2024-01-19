import React from "react";
import { Link } from "react-router-dom";

import Form from "../Form/Form.jsx";

function AuthScreen({ name, title, buttonText, onSubmit, isValid, ...props }) {
  return (
    <section className="authorization">
      <div className="authorization__wrapper">
        <h2 className="authorization__title">{title}</h2>
        <Form name={name} buttonText={buttonText} onSubmit={onSubmit} isValid={isValid}>
          {props.children}
        </Form>
        {name === "registr" && (
          <p className="authorization__text">
            Уже зарегистрированы?{" "}
            <Link to="/sign-in" className="authorization__text authorization__link">
              Войти
            </Link>
          </p>
        )}
      </div>
    </section>
  );
}

export default AuthScreen;
