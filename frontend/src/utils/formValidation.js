import { useCallback, useState } from "react";

export default function useFormValidation() {
  const [valuen, setValuen] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [isInputValid, setIsInputValid] = useState({});

  function handleChange(evt) {
    const name = evt.target.name;
    const value = evt.target.value;
    const validMessage = evt.target.validationMessage;
    const valid = evt.target.validity.valid;
    const form = evt.target.form;

    setValuen((baseValues) => {
      return { ...baseValues, [name]: value };
    });

    setErrors((baseErrors) => {
      return { ...baseErrors, [name]: validMessage };
    });

    setIsInputValid((baseInputValid) => {
      return { ...baseInputValid, [name]: valid };
    });

    setIsValid(form.checkValidity());
  }

  function reset(data = {}) {
    setValuen(data);
    setErrors({});
    setIsValid(false);
    setIsInputValid({});
  }

  const setValue = useCallback((name, value) => {
    setValuen((baseValues) => {
      return { ...baseValues, [name]: value };
    });
  }, []);

  return { valuen, errors, isValid, isInputValid, handleChange, reset, setValue };
}
