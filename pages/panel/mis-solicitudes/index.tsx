import React, { useContext, useEffect, useState } from "react";
import { Loader } from "rsuite";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../../../context/AuthConext";
import { useRouter } from "next/router";
import CheckLogin from "../../../hooks/useCheckLogin";
import SideNav from "../../../components/globals/SideNav";
import Header from "../../../components/globals/Header";
import MiSolicitudesTable from "../../../components/Tables/MiSolicitudesTable";

const MiSolicitudes = () => {
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
              title="Mis Solicitudes"
              divider={null}
            ></Header>
            <MiSolicitudesTable />
            <ToastContainer />
          </SideNav>
        </>
      )}
    </>
  );
};

export default MiSolicitudes;
