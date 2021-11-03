import router from "next/router";
import React, { useState, useEffect } from "react";
import { Button, ButtonToolbar, SelectPicker, Uploader } from "rsuite";
import getPeriodos from "../../hooks/useGetPeriodos";

const CrearSolicitud = () => {
  const [aniosObject, setAniosObject]: any = useState([]);

  const fetchSolicitudApi = (e: any) => {
    e.preventDefault();
  };

  useEffect(() => {
    const peticionPeriodos = async () => {
      const peticion = await getPeriodos();
      peticion.forEach((element: any) => {
        setAniosObject((oldArray: any) => [
          ...oldArray,
          { label: element.anio, value: element.anio },
        ]);
      });
    };
    peticionPeriodos();
  }, []);

  return (
    <div className="container">
      <form onSubmit={(e) => fetchSolicitudApi(e)}>
        <div className="row mb-3">
          <div className="col-12 col-sm-6 mb-3">
            <label className="form-label" htmlFor="form6Example1">
              Nombre del beneficiario
            </label>
            <input
              type="text"
              id="name_benef"
              name="name_benef"
              className="form-control"
            />
          </div>
          <div className="col-12 col-sm-6">
            <label className="form-label" htmlFor="form6Example2">
              Rut Beneficiario
            </label>
            <input
              type="text"
              id="rut:benef"
              name="rut_benef"
              className="form-control"
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12 col-sm-6 mb-3">
            <label className="form-label" htmlFor="form6Example1">
              Carrera Beneficiario
            </label>
            <input
              type="text"
              id="name_benef"
              name="name_benef"
              className="form-control"
            />
          </div>
          <div className="col-12 col-sm-6">
            <label className="form-label" htmlFor="form6Example1">
              Tipo de matricula
            </label>
            <SelectPicker
              size="md"
              placeholder="Seleccione"
              style={{ width: "100%" }}
              id="type_benef"
              data={[
                {
                  label: "Alumno nuevo",
                  value: "nuevo",
                },
                {
                  label: "Alumno antiguo",
                  value: "antiguo",
                },
              ]}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12 col-sm-12 mb-3">
            <label className="form-label" htmlFor="form6Example1">
              Año que aplica
            </label>
            <SelectPicker
              size="md"
              placeholder="Seleccione"
              style={{ width: "100%" }}
              id="type_benef"
              data={aniosObject}
            />
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12 col-sm-12">
            <label className="form-label" htmlFor="form6Example1">
              adjunte archivos
            </label>
            <Uploader action={" "} draggable>
              <div style={{ width: "100%", height: 100 }}>
                <h5>
                  Haga click aca y adjunte su documentación o arrastre los
                  documentos a esta zona.
                </h5>
              </div>
            </Uploader>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-12 col-sm-12 text-center">
            <ButtonToolbar>
              <Button className="px-5 mx-5" type="submit" appearance="primary">
                Enviar
              </Button>
              <Button
                color="red"
                appearance="primary"
                onClick={() => router.push("/panel")}
                className="px-5 mx-5"
              >
                Cancelar
              </Button>
            </ButtonToolbar>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CrearSolicitud;
