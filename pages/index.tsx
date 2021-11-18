import React, { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Button, Loader } from "rsuite";
import Image from "next/image";
import logoUCN from "../public/Escudo-UCN-Full-Color.png";

import { AuthContext } from "../context/AuthConext"; //context
import Checklogin from "../hooks/useCheckLogin"; //hook de check
import { useRouter } from "next/router";

import useValidation from "../hooks/useValidation";
import loginValidation from "../validations/loginValidation";
import ingresarSistema from "../hooks/useLogin";

import ingresoGoogle from "../hooks/useLoginGoogle";

const STATE_INIT = {
  email: "",
  password: "",
};

const Home = () => {
  const { signIn, checkLogin } = useContext(AuthContext);
  const [isLoged, setIsLoged] = useState(true);
  const [firstTime, setFirstTime] = useState(true);
  const router = useRouter();

  function startGoogle() {
    var auth2: any;
    //@ts-ignore
    gapi.load("auth2", function () {
      //@ts-ignore
      auth2 = gapi.auth2.init({
        client_id:
          "920846582943-uh9c9joa2nqkmk6skvtg46553dcp6490.apps.googleusercontent.com",
      });
      attachSignin(document.getElementById("customBtn"));
    });

    function attachSignin(element: any) {
      auth2.attachClickHandler(
        element,
        { scope: "profile email" },
        onSuccess,
        onFailure
      );
    }

    function onSuccess(googleUser: any) {
      setIsLoged(true);
      const token = googleUser.getAuthResponse().access_token;
      console.log(token);
      async function ingreso() {
        const loginGoogle = await ingresoGoogle(token);
        if (loginGoogle === "error conexion") {
          notifyError();
          setIsLoged(false);
        } else if (loginGoogle.access_token) {
          checkLogin(loginGoogle.rol);
          router.push("/panel");
        } else {
          notifyIncorrect();
          setIsLoged(false);
        }
      }
      ingreso();
    }

    function onFailure(error: any) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function verificar() {
      const verificacion = await Checklogin();
      if (verificacion === "error conexion") {
        notifyError();
        setIsLoged(false);
      } else if (verificacion.rol) {
        checkLogin(verificacion.rol);
        signIn(verificacion.rol, verificacion.id);
        router.push("/panel");
      } else if (verificacion.message) {
        if (firstTime) {
          setIsLoged(false);
          setFirstTime(false);
          if (router.query.logout === "ok") {
            notifyLogout();
          }
          //@ts-ignore
          if (gapi) {
            startGoogle();
          } else {
            router.reload();
          }
        } else {
          setIsLoged(false);
          notifyIncorrect();
        }
      }
    }
    verificar();
  }, []);

  const iniciarSesion = async () => {
    setIsLoged(true);
    const peticion = await ingresarSistema(email, password, true);
    console.log(peticion);
    if (peticion.error === "Credenciales incorrectas") {
      notifyIncorrect();
      setIsLoged(false);
    } else if (peticion.errors) {
      notifyIncorrect();
      setIsLoged(false);
    }

    if (peticion.access_token) {
      signIn(peticion.rol, peticion.id);
      email = "";
      password = "";
      router.push("/panel");
    }
  };

  const { values, errores, handlerSubmit, handleChange, handlerBlur } =
    useValidation(STATE_INIT, loginValidation, iniciarSesion);
  let { email, password } = values;

  const notifyIncorrect = () =>
    toast.error("Usuario o contraseña incorrecto...");
  const notifyError = () =>
    toast.error("Error al conectar a la base de datos...");
  const notifyLogout = () => toast.success("Salió con exito");

  return (
    <>
      {isLoged ? (
        <Loader size="lg" backdrop content="Cargando..." vertical />
      ) : (
        <>
          <div className="login">
            <div className="login__content">
              <div className="login__imagenes">
                <Image
                  src={logoUCN}
                  alt="Logo UCN"
                  width="100px"
                  height="100px"
                  className="login__imagen"
                ></Image>
                <Image
                  src="/Imagen-DGE.jpg"
                  alt="Logo DGE"
                  width="100px"
                  height="100px"
                  className="login__imagen"
                ></Image>
              </div>
              {/* login form */}
              <form
                id="formulario"
                className="login__form"
                onSubmit={handlerSubmit}
                noValidate={true}
              >
                <div className="login__inputs">
                  <div className="login__input">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="email@ucn.cl"
                      value={email}
                      onChange={handleChange}
                      onBlur={handlerBlur}
                    />
                    <label htmlFor="username" className="fas fa-user" />
                  </div>
                  <div className="login__input">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="********"
                      value={password}
                      onChange={handleChange}
                      onBlur={handlerBlur}
                    />
                    <label htmlFor="password" className="fas fa-key" />
                  </div>
                </div>
                <button type="submit" className="login__button">
                  INGRESAR
                </button>
                <button
                  type="button"
                  onClick={startGoogle}
                  id="customBtn"
                  className="login__button"
                >
                  Ingreso funcionario
                </button>
              </form>

              <div className="login__footer">
                Si tiene problemas para ingresar al sistema contactar a
                vra.dge@ucn.cl
              </div>
            </div>
          </div>
          <div>
            <ToastContainer />
          </div>
        </>
      )}
    </>
  );
};

export default Home;
