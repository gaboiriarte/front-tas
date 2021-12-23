import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthConext";
import Checklogin from "../../hooks/useCheckLogin";
import Header from "../../components/globals/Header";
import Admin from "../../components/panel-dashboard/Admin";
import Funcionario from "../../components/panel-dashboard/Funcionario";
import { Loader } from "rsuite";
import { ToastContainer, toast } from "react-toastify";
import SideNav from "../../components/globals/SideNav";
import DireccionPersonas from "../../components/panel-dashboard/DireccionPersonas";
import Cobranza from "../../components/panel-dashboard/Cobranza";
import DGE from "../../components/panel-dashboard/DGE";

const Dashboard = () => {
  const router = useRouter();
  const { signIn, checkLogin, authState } = useContext(AuthContext);
  const [isLoged, setIsLoged] = useState(true);
  const [nameUser, setNameUser] = useState("");
  const [idUser, setIdUser] = useState("");
  const [emailUser, setEmailUser] = useState("");
  const [rolUser, setRolUser] = useState("");

  useEffect(() => {
    async function verificar() {
      const verificacion = await Checklogin();
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
    if (router.query.ok) {
      toast.success("Solicitud creada con exito");
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
              divider="Menú Funcionario"
            ></Header>
            {rolUser == "administrador" && <Admin />}
            {rolUser == "funcionario" && <Funcionario />}
            {rolUser == "dpe" && <DireccionPersonas />}
            {rolUser == "cobranza" && <Cobranza />}
            {rolUser == "dge" && <DGE />}
            <ToastContainer />
          </SideNav>
        </>
      )}
    </>
  );
};

export default Dashboard;
