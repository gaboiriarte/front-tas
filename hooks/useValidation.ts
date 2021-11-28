import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const useValidation = (stateInicial: any, validar: any, fn: any) => {
  const [values, setValues] = useState(stateInicial);
  const [errores, setErrores] = useState<any>({});
  const [submitForm, setSubmitForm] = useState(false);

  useEffect(() => {
    if (submitForm) {
      const noErrores = Object.keys(errores).length === 0;
      if (noErrores) {
        fn();
      } else {
        let keys = Object.keys(errores);
        for (const error of keys) {
          toast.error(errores[error]);
        }
      }
      setSubmitForm(false);
    }
  }, [errores, fn, submitForm]);

  //función que ejecuta conforme el usuario escribe
  const handleChange = (e: any, name?: any) => {
    if (name) {
      setValues({ ...values, [name]: e });
    } else {
      setValues({ ...values, [e.target.name]: e.target.value });
    }
  };

  //función que se ejecuta cuando el usuario hace submit
  const handlerSubmit = (e: any) => {
    e.preventDefault();
    const ErroresValidacion = validar(values);

    setErrores(ErroresValidacion);
    setSubmitForm(true);
  };

  const handlerBlur = (e: any) => {
    e.preventDefault();
    const ErroresValidacion = validar(values);
    setErrores(ErroresValidacion);
  };

  return {
    values,
    errores,
    submitForm,
    handlerSubmit,
    handleChange,
    handlerBlur,
  };
};

export default useValidation;
