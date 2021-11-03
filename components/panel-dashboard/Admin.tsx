import React from "react";
import { Col, Message, Row } from "rsuite";

const Admin = () => {
  return (
    <Row className="show-grid m-4">
      <Col xs={8}>
        <div className="card text-center border rounded-3 border-primary shadow-1 m-3">
          <div className="card-header p-0">
            <Message showIcon type="info">
              Gestión de roles
            </Message>
          </div>
          <div className="card-body">
            <p className="card-text">Permite asignar roles</p>

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
              Opcion 2
            </Message>
          </div>
          <div className="card-body">
            <p className="card-text">Weas pa la opcion 2</p>

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
              Opcion 3
            </Message>
          </div>
          <div className="card-body">
            <p className="card-text">weas pa la opcion 3</p>

            <button type="button" className="btn btn-primary">
              <h5>ir</h5>
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Admin;
