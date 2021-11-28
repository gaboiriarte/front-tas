import React from "react";

const RechazarCobranza = ({ id }: any) => {
  return (
    <div className="container">
      <div className="card card-form shadow-1 mt-2 mb-4">
        <div className="card-header">
          <p className="text-center">Rechazar solicitud {id}</p>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-12 col-sm-12 mb-3">
              <label className="form-label" htmlFor="form6Example1">
                Ingresa motivo del rechazo
              </label>
              <textarea
                id="comentario_cobranza"
                name="comentario_cobranza"
                className="form-control"
                rows={5}
                required
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RechazarCobranza;
