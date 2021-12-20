import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Button, Loader } from "rsuite";
import SideNav from "../../../components/globals/SideNav";
import { AuthContext } from "../../../context/AuthConext";
import CheckLogin from "../../../hooks/useCheckLogin";
import Header from "../../../components/globals/Header";
import DetallesSolicitudAuth from "../../../components/Show/MiSolicitud";

const DetalleSolicitud = () => {
  const router = useRouter();
  const { signIn, checkLogin, authState } = useContext(AuthContext);
  const [isLoged, setIsLoged] = useState(true);
  const [nameUser, setNameUser] = useState("");
  const [idUser, setIdUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [rolUser, setRolUser] = useState("");

  useEffect(() => {
    async function verificar() {
      const verificacion = await CheckLogin();
      if (verificacion === "error conexion") {
        router.push("/");
      } else if (verificacion.rol) {
        checkLogin(verificacion.rol);
        signIn(verificacion.rol, verificacion.id);
        setIdUser(verificacion.id);
        setNameUser(verificacion.name);
        setEmailUser(verificacion.email);
        setRolUser(verificacion.rol);
        setIsLoged(false);
      } else if (verificacion.message) {
        router.push("/");
      }
    }
    verificar();
  }, []);

  return (
    <>
      {isLoged ? (
        <Loader size="lg" backdrop content="Cargando..." vertical />
      ) : (
        <>
          <SideNav>
            <Header
              rolUser={rolUser}
              nameUser={nameUser}
              title={"Solicitud Nº " + router.query.id}
              divider={"Detalles"}
            ></Header>
            <DetallesSolicitudAuth id={router.query.id} />
            <div className="container text-center">
              <Button onClick={router.back} className="boton-enviar mb-3 px-4">
                Volver
              </Button>
            </div>
          </SideNav>
        </>
      )}
    </>
  );
};

export default DetalleSolicitud;
