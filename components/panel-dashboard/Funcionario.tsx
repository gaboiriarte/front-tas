import React from "react";
import { Col, Message, Row } from "rsuite";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClipboardList,
  faFileUpload,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Funcionario = () => {
  return (
    <Row className="show-grid m-4 d-flex flex-lg-row flex-column justify-content-center">
      <Col xs={24} lg={6} md={12}>
        <div className="card text-center shadow-1 mt-2">
          <div className="card-header">
            <FontAwesomeIcon
              className="icono__panel"
              icon={faFileUpload}
              size="3x"
            />
            <p>Nueva Solicitud</p>
          </div>
          <div className="card-body">
            <p className="card-text">Permite ingresar una solicitud de beca</p>

            <a
              type="button"
              className="btn boton-panel mx-4"
              href="panel/crear-solicitud"
            >
              Crear
            </a>
          </div>
        </div>
      </Col>
      <Col xs={24} lg={6} md={12}>
        <div className="card text-center shadow-1 mt-2">
          <div className="card-header">
            <FontAwesomeIcon
              className="icono__panel"
              icon={faClipboardList}
              size="3x"
            />
            <p>Revisar solicitud de beca</p>
          </div>
          <div className="card-body">
            <p className="card-text">
              Permite verificar el estado de mis solicitudes
            </p>

            <a
              type="button"
              className="btn boton-panel mx-4"
              href="panel/mis-solicitudes"
            >
              ver
            </a>
          </div>
        </div>
      </Col>
      <Col xs={24} lg={6} md={12}>
        <div className="card text-center shadow-1 mt-2">
          <div className="card-header">
            <FontAwesomeIcon className="icono__panel" icon={faUser} size="3x" />
            <p>Mis Datos</p>
          </div>
          <div className="card-body">
            <p className="card-text">
              Permite ver y modificar mis datos personales
            </p>

            <a
              type="button"
              className="btn boton-panel mx-4"
              href="panel/crear-solicitud"
            >
              ver
            </a>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Funcionario;
