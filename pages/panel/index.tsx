import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthConext";
import Checklogin from "../../hooks/useCheckLogin";
import Header from "../../components/globals/Header";
import Admin from "../../components/panel-dashboard/Admin";
import Funcionario from "../../components/panel-dashboard/Funcionario";
import { Loader } from "rsuite";

const Dashboard = () => {
  const router = useRouter();
  const { signIn, checkLogin } = useContext(AuthContext);
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
    verificar();
  }, []);

  return (
    <>
      <Header
        rolUser={rolUser}
        nameUser={nameUser}
        title="Sistema de gestión beca hijo de funcionario"
        divider="Menú"
      ></Header>
      {rolUser == "administrador" && <Admin />}
      {rolUser == "funcionario" && <Funcionario />}
      {isLoged ? <Loader backdrop content="Cargando..." vertical /> : null}
    </>
  );
};

export default Dashboard;
