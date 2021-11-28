import React from "react";

const AprobarCobranza = ({ id }: any) => {
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
                id="comentario_cobranza"
                name="comentario_cobranza"
                className="form-control"
                rows={5}
              ></textarea>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12 col-sm-12 mb-3">
              <label className="form-label" htmlFor="form6Example1">
                Seleccione estado curricular
              </label>
              <select
                id="estado_curricular"
                name="estado_curricular"
                className="form-control"
              >
                <option value="matriculado">Matriculado</option>
                <option value="no matriculado">No Matriculado</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AprobarCobranza;
