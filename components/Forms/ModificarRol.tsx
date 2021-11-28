import React from "react";

const ModificarRol = () => {
  return (
    <div className="container">
      <div className="card card-form shadow-1 mt-2 mb-4">
        <div className="card-header">
          <p className="text-center">Modificar Rol</p>
        </div>
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-12 col-sm-12 mb-3">
              <label className="form-label" htmlFor="form6Example1">
                Seleccione Nuevo Rol
              </label>
              <select id="rol" name="rol" className="form-control">
                <option value="funcionario">Funcionario</option>
                <option value="dpe">Encargado dirección de personas</option>
                <option value="cobranza">Encargado cobranzas</option>
                <option value="dge">
                  Encargado dirección general estudiantil
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModificarRol;
