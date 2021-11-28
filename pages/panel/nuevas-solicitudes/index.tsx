import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { Button, Loader } from "rsuite";
import SideNav from "../../../components/globals/SideNav";
import { AuthContext } from "../../../context/AuthConext";
import CheckLogin from "../../../hooks/useCheckLogin";
import Header from "../../../components/globals/Header";
import NuevasSolicitudesDPE from "../../../components/Tables/NuevasSolicitudes";
import NuevasSolicitudesCobranza from "../../../components/Tables/NuevasSolicitudesCobranza";
import NuevasSolicitudesDGE from "../../../components/Tables/NuevasSolicitudesDGE";

const NuevasSolicitudes = () => {
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
              title="Sistema de gestión beca hijo de funcionario"
              divider="Menú"
            ></Header>
            {rolUser === "dpe" && <NuevasSolicitudesDPE />}
            {rolUser === "cobranza" && <NuevasSolicitudesCobranza />}
            {rolUser === "dge" && <NuevasSolicitudesDGE />}
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

export default NuevasSolicitudes;
