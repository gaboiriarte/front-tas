import { useRouter } from "next/router";
import React from "react";
import { Divider } from "rsuite";
import Logout from "../../hooks/useLogout";

const Header = ({ nameUser, rolUser, title, divider }: any) => {
  const router = useRouter();
  const cerrarSesion = async () => {
    const peticion = await Logout();
    console.log(peticion);
    router.push({ pathname: "/", query: { logout: true } });
  };
  return (
    <>
      <div className="p-5 bg-portada">
        <h5 className="mb-0 text-right">Bienvenido/a: {nameUser}</h5>
        {rolUser === "funcionario" && (
          <h5 className="mb-3 text-right">
            Usted ha ingresado como: Funcionario UCN
          </h5>
        )}
        {rolUser === "administrador" && (
          <h5 className="mb-3 text-right">
            Usted ha ingresado como: Administrador plataforma DGE
          </h5>
        )}
        {rolUser === "dpe" && (
          <h5 className="mb-3 text-right">
            Usted ha ingresado como: Encargado dirección de personas
          </h5>
        )}
        {rolUser === "cobranza" && (
          <h5 className="mb-3 text-right">
            Usted ha ingresado como: Encargado cobranza
          </h5>
        )}
        {rolUser === "dge" && (
          <h5 className="mb-3 text-right">
            Usted ha ingresado como: Encargado Dirección general estudiantil
          </h5>
        )}
      </div>
      <h2 className="mb-3 text-center">{title}</h2>
      <Divider>{divider}</Divider>
    </>
  );
};

export default Header;
