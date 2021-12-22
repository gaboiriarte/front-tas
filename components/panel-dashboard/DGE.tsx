import {
  faClipboardList,
  faFileUpload,
  faFolderPlus,
  faHistory,
  faThumbtack,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Col, Divider, Message, Row } from "rsuite";

const DGE = () => {
  return (
    <>
      <Row className="show-grid m-4 d-flex flex-lg-row flex-column justify-content-center">
        <Col xs={24} lg={6} md={12}>
          <div className="card text-center shadow-1 mt-2">
            <div className="card-header">
              <FontAwesomeIcon
                className="icono__panel"
                icon={faFileUpload}
                size="2x"
              />
              <p>Nueva Solicitud</p>
            </div>
            <div className="card-body">
              <p className="card-text">
                Permite ingresar una solicitud de beca
              </p>

              <a
                type="button"
                className="btn boton-panel mx-5"
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
                size="2x"
              />
              <p>Revisar solicitud de beca</p>
            </div>
            <div className="card-body">
              <p className="card-text">
                Permite verificar el estado de mis solicitudes
              </p>

              <a
                type="button"
                className="btn boton-panel mx-5"
                href="panel/mis-solicitudes"
              >
                ver
              </a>
            </div>
          </div>
        </Col>
      </Row>
      <Divider>Administración Dirección General Estudiantil</Divider>
      <Row className="show-grid m-4 d-flex flex-lg-row flex-column justify-content-center">
        <Col xs={24} lg={6} md={12}>
          <div className="card text-center shadow-1 mt-2">
            <div className="card-header">
              <FontAwesomeIcon
                className="icono__panel"
                icon={faFolderPlus}
                size="2x"
              />
              <p>Revisar nuevas solicitudes</p>
            </div>
            <div className="card-body">
              <p className="card-text">
                Permite revisar solicitudes aprobadas por cobranza
              </p>

              <a
                type="button"
                className="btn boton-panel mx-5"
                href="panel/nuevas-solicitudes"
              >
                Revisar
              </a>
            </div>
          </div>
        </Col>
        <Col xs={24} lg={6} md={12}>
          <div className="card text-center shadow-1 mt-2">
            <div className="card-header">
              <FontAwesomeIcon
                className="icono__panel"
                icon={faHistory}
                size="2x"
              />
              <p>Historial de solicitudes</p>
            </div>
            <div className="card-body">
              <p className="card-text">
                Permite ver todas las solicitudes del sistema
              </p>

              <a
                type="button"
                className="btn boton-panel mx-5"
                href="panel/historial-solicitudes"
              >
                ver
              </a>
            </div>
          </div>
        </Col>
        <Col xs={24} lg={6} md={12}>
          <div className="card text-center shadow-1 mt-2">
            <div className="card-header">
              <FontAwesomeIcon
                className="icono__panel"
                icon={faThumbtack}
                size="2x"
              />
              <p>Solicitudes pendientes</p>
            </div>
            <div className="card-body">
              <p className="card-text">
                Permite ver todas las solicitudes en estado pendiente
              </p>

              <a
                type="button"
                className="btn boton-panel mx-5"
                href="panel/solicitudes-pendientes"
              >
                ver
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default DGE;
