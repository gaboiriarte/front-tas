import React from "react";

const PendienteDGE = ({ id }: any) => {
  return (
    <div className="container">
      <div className="card card-form shadow-1 mt-2 mb-4">
        <div className="card-header">
          <p className="text-center">Pendiente Solicitud {id}</p>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-12 col-sm-12 mb-3">
              <label className="form-label" htmlFor="form6Example1">
                Motivo solicitud pendiente
              </label>
              <textarea
                id="comentario_dge"
                name="comentario_dge"
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

export default PendienteDGE;
