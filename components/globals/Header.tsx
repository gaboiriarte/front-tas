import React from "react";
import { Divider } from "rsuite";

const Header = ({ nameUser, rolUser, title, divider }: any) => {
  return (
    <>
      <div className="p-5 bg-light bg-portada">
        <h5 className="mb-0 text-right">Bienvenido: {nameUser}</h5>
        <h5 className="mb-3 text-right">Usted a ingresado como: {rolUser}</h5>
        <button type="button" className="btn btn-danger btn-lg">
          <h5>Cerrar Sesión</h5>
        </button>
      </div>
      <h2 className="mb-3 text-center">{title}</h2>
      <Divider>{divider}</Divider>
    </>
  );
};

export default Header;
