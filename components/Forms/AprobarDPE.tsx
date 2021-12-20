import React from "react";

const AprobarDPE = ({ id }: any) => {
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
                id="comentario_dpe"
                name="comentario_dpe"
                className="form-control"
                rows={5}
              ></textarea>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col-12 col-sm-12 mb-3">
              <label className="form-label" htmlFor="form6Example1">
                Seleccione estamento
              </label>
              <select
                id="tipo_estamento"
                name="tipo_estamento"
                className="form-control"
              >
                <option value="academico">Académico</option>
                <option value="no academico">No Académico</option>
                <option value="ex funcionario">Ex-funcionario</option>
                <option value="excepcion especial">Excepción especial</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AprobarDPE;
