import React from "react";

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

  console.log(JSON.stringify(data))
  try {
    await fetch("https://emailbhf.herokuapp.com/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then(function (res) {
        console.log(res);
        return res;
      })
      .catch((err) => {
        // console.log(err);
        return err;
      });
  } catch (e) {
    return e;
  }
};

export default UseNotification;
