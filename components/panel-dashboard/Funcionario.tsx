import React from "react";
import { Col, Message, Row } from "rsuite";

const Funcionario = () => {
  return (
    <Row className="show-grid m-4">
      <Col xs={8}>
        <div className="card text-center border rounded-3 border-primary shadow-1 m-3">
          <div className="card-header p-0">
            <Message showIcon type="info">
              Crear Solicitud de Beca
            </Message>
          </div>
          <div className="card-body">
            <p className="card-text">Permite ingresar una solicitud de beca</p>

            <a
              type="button"
              className="btn btn-primary"
              href="panel/crear-solicitud"
            >
              <h5>Ir</h5>
            </a>
          </div>
        </div>
      </Col>
      <Col xs={8}>
        <div className="card text-center border rounded-3 border-primary shadow-1 m-3">
          <div className="card-header p-0">
            <Message showIcon type="info">
              Revisar solicitud de beca
            </Message>
          </div>
          <div className="card-body">
            <p className="card-text">
              Permite verificar el estado de las solicitudes
            </p>

            <button type="button" className="btn btn-primary">
              <h5>Ir</h5>
            </button>
          </div>
        </div>
      </Col>
      <Col xs={8}>
        <div className="card text-center border rounded-3 border-primary shadow-1 m-3">
          <div className="card-header p-0">
            <Message showIcon type="info">
              Mis Datos
            </Message>
          </div>
          <div className="card-body">
            <p className="card-text">
              Permite ver o editar mis datos de contacto
            </p>

            <a type="button" className="btn btn-primary">
              <h5>ir</h5>
            </a>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Funcionario;
