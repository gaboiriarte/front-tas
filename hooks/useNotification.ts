import React from "react";

/**
 * Este metodo se encarga de enviar uno o más correos, para enviar más de un correo
 * deben ir separados por comas.
 * ej:
 * const email = "correo1@mail.com"
 * const emails = "correo1@mail.com,correo2@mail.com"
 *
 * @param email - Correo(s) electronico
 * @param subject - Asunto del correo
 * @param message - Mensaje del correo
 *
 * **/

const UseNotification = async (
  email: string,
  subject = "Notificación de plataforma Beca Hijo de funcionario",
  message = "Por favor, revise la plataforma Beca hijo de funcionario, para visualizar las actualizaciones."
) => {
  const pass = "12345";

  let data = {
    email,
    subject,
    message,
    password: pass,
  };
  console.log("CORREOS: " + email);
  try {
    await fetch("https://emailbhf.herokuapp.com/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(function (res) {
        return res;
      })
      .catch((err) => {
        return err;
      });
  } catch (e) {
    return e;
  }
};

export default UseNotification;
