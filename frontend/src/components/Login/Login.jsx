import React from "react";
import useFormValidation from "../../utils/formValidation";

import AuthScreen from "../AuthScreen/AuthScreen.jsx";

function Login({ onLogin, onLoading }) {
  const { valuen, errors, isValid, handleChange } = useFormValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(valuen);
  }
  return (
    <AuthScreen
      name="login"
      title="Вход"
      buttonText={onLoading ? "Вход..." : "Войти"}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label className="form__input-wrapper">
        <input
          type="email"
          name="email"
          form="login"
          required
          placeholder="Email"
          className={`form__input form__input_place_authorization ${
            errors.email ? "form__input_type_error" : ""
          }`}
          id="email-input"
          onChange={handleChange}
          value={valuen.email || ""}
        />
        <span className={`form__input-error ${errors.email ? "form__input-error_active" : ""}`}>
          {errors.email || ""}
        </span>
      </label>
      <label className="form__input-wrapper">
        <input
          type="password"
          name="password"
          form="login"
          required
          minLength="6"
          placeholder="Пароль"
          className={`form__input form__input_place_authorization ${
            errors.password ? "form__input_type_error" : ""
          }`}
          id="password-input"
          onChange={handleChange}
          value={valuen.password || ""}
        />
        <span className={`form__input-error ${errors.password ? "form__input-error_active" : ""}`}>
          {errors.password || ""}
        </span>
      </label>
    </AuthScreen>
  );
}

export default Login;
