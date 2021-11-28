import React from "react";
import { Col, Message, Row } from "rsuite";

const Admin = () => {
  return (
    <Row className="show-grid m-4 d-flex flex-lg-row flex-column justify-content-center">
      <Col xs={24} lg={6} md={12}>
        <div className="card text-center shadow-1 mt-2">
          <div className="card-header">
            <p>Administrar roles</p>
          </div>
          <div className="card-body">
            <p className="card-text">Permite asignar roles a los usuarios</p>

            <a
              type="button"
              className="btn boton-panel mx-5"
              href="panel/set-roles"
            >
              ver
            </a>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Admin;
