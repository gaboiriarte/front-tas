import React from "react";

const AprobarDGE = ({ id }: any) => {
  return (
    <div className="container">
      <div className="card card-form shadow-1 mt-2 mb-4">
        <div className="card-header">
          <p className="text-center">Aprobar solicitud {id}</p>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-12 col-sm-12 mb-3">
              <label className="form-label" htmlFor="form6Example1">
                Agregar comentarios a la solicitud
              </label>
              <textarea
                id="comentario_dge"
                name="comentario_dge"
                className="form-control"
                rows={5}
              ></textarea>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AprobarDGE;
