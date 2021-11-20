import router, { useRouter } from "next/router";
import React, { useState, useEffect, useContext } from "react";
import { Button, ButtonToolbar, SelectPicker, Uploader } from "rsuite";
import { AuthContext } from "../../context/AuthConext";
import getPeriodos from "../../hooks/useGetPeriodos";
import useValidation from "../../hooks/useValidation";
import { formatoRut, validarRut } from "../../validations/validarRut";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Loader } from "rsuite";
import { ToastContainer, toast } from "react-toastify";
import InputMask from "react-input-mask";
import postSolicitudEspecial from "../../hooks/usePostSolicitudEspecial";
import crearSolicitudValidationEspecial from "../../validations/crearSolicitudEspecialValidation";

const STATE_INIT = {
  name_benef: "",
  rut_benef: "",
  carrera_benef: "",
  type_benef: "",
  anio: "",
  comentario_funcionario: "",
  documentacion: [],
  name_funcionario: "",
  rut_funcionario: "",
  email_funcionario: "",
  fono_funcionario: "",
  tipo_estamento: "",
  comentario_dpe: "",
};

const CrearSolicitudEspecial = () => {
  const { authState } = useContext(AuthContext);
  const [aniosObject, setAniosObject]: any = useState([]);
  const [isLoged, setIsLoged] = useState(false);
  const MySwal = withReactContent(Swal);
  const router = useRouter();

  const fetchSolicitudApi = async () => {
    MySwal.fire({
      title: "¿Enviar solicitud?",
      text: "Una vez enviada pasará a revisión cobranza",
      icon: "info",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#003057",
      cancelButtonColor: "#da291c",
      confirmButtonText: "Aceptar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoged(true);

        const submitSolicitud = await postSolicitudEspecial(
          name_benef,
          formatoRut(rut_benef),
          carrera_benef,
          type_benef,
          anio,
          comentario_funcionario,
          documentacion,
          name_funcionario,
          rut_funcionario,
          email_funcionario,
          fono_funcionario,
          tipo_estamento,
          comentario_dpe
        );
        if (submitSolicitud.mensaje === "Solicitud creada con exito") {
          router.push({ pathname: "/panel", query: { ok: true } });
        } else if (
          submitSolicitud.mensaje ===
          "Alumno con solicitud pendiente en sistema"
        ) {
          setIsLoged(false);
          toast.error(submitSolicitud.mensaje);
        } else if (submitSolicitud.errors) {
          setIsLoged(false);
          toast.error("El email del funcionario ya esta en el sistema");
        }
        // ingresar verificaciones de backend!!!
      }
    });
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

  const { values, errores, handlerSubmit, handleChange, handlerBlur } =
    useValidation(
      STATE_INIT,
      crearSolicitudValidationEspecial,
      fetchSolicitudApi
    );
  let {
    name_benef,
    rut_benef,
    carrera_benef,
    type_benef,
    anio,
    comentario_funcionario,
    documentacion,
    name_funcionario,
    email_funcionario,
    fono_funcionario,
    tipo_estamento,
    comentario_dpe,
    rut_funcionario,
  } = values;

  return (
    <div className="container">
      {isLoged ? (
        <Loader size="lg" backdrop content="Cargando..." vertical />
      ) : (
        <div className="card card-form shadow-1 mt-2 mb-4">
          <form onSubmit={handlerSubmit}>
            <div className="card-header">
              <p className="text-center">Crear Solicitud</p>
            </div>
            <div className="card-body">
              <div className="row mb-3">
                <div className="col-12 col-sm-8 mb-3">
                  <label className="form-label" htmlFor="form6Example1">
                    Nombre del beneficiario
                  </label>
                  <input
                    placeholder="Ingrese nombre completo"
                    type="text"
                    id="name_benef"
                    name="name_benef"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handlerBlur}
                  />
                </div>
                <div className="col-12 col-sm-4">
                  <label className="form-label" htmlFor="form6Example2">
                    Rut Beneficiario
                  </label>
                  <input
                    placeholder="12345678-9"
                    type="text"
                    id="rut_benef"
                    name="rut_benef"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handlerBlur}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12 col-sm-8 mb-3">
                  <label className="form-label" htmlFor="form6Example1">
                    Carrera Beneficiario
                  </label>
                  <input
                    placeholder="Carrera UCN NOTA: ESTO DEBE SER UN DROPDOWN"
                    type="text"
                    id="carrera_benef"
                    name="carrera_benef"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handlerBlur}
                  />
                </div>
                <div className="col-12 col-sm-4">
                  <label className="form-label" htmlFor="form6Example1">
                    Tipo de matricula
                  </label>
                  <SelectPicker
                    searchable={false}
                    size="md"
                    placeholder="Alumno nuevo o antiguo"
                    style={{ width: "100%" }}
                    id="type_benef"
                    onChange={(e) => handleChange(e, "type_benef")}
                    onBlur={handlerBlur}
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
                    onChange={(e) => handleChange(e, "anio")}
                    onBlur={handlerBlur}
                    size="md"
                    placeholder="Seleccione el año que aplica beca"
                    style={{ width: "100%" }}
                    id="anio"
                    data={aniosObject}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12 col-sm-12">
                  <label className="form-label" htmlFor="form6Example1">
                    Información adicional sobre la solicitud
                  </label>
                  <textarea
                    placeholder="Agregue cualquier información adicional para personal del departamento de personas o cobranzas"
                    onChange={handleChange}
                    onBlur={handlerBlur}
                    className="form-control"
                    id="comentario_funcionario"
                    name="comentario_funcionario"
                    rows={4}
                  ></textarea>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12 col-sm-12">
                  <label className="form-label" htmlFor="form6Example1">
                    adjunte archivos
                  </label>
                  <Uploader
                    onChange={(e) => handleChange(e, "documentacion")}
                    action={" "}
                    draggable
                  >
                    <div style={{ width: "100%", height: 100 }}>
                      <h6>
                        Adjunte certificado de nacimiento u otro documento que
                        acredite parentesco. Puede arrastrar o hacer click
                      </h6>
                    </div>
                  </Uploader>
                </div>
              </div>
              <ToastContainer />
            </div>
            <div className="card-header">
              <p className="text-center">Datos de la solicitud (Funcionario)</p>
            </div>

            <div className="card-body">
              <div className="row mb-3">
                <div className="col-12 col-sm-8 mb-3">
                  <label className="form-label" htmlFor="form6Example1">
                    Nombre del Funcionario
                  </label>
                  <input
                    placeholder="Ingrese nombre completo"
                    type="text"
                    id="name_funcionario"
                    name="name_funcionario"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handlerBlur}
                  />
                </div>
                <div className="col-12 col-sm-4">
                  <label className="form-label" htmlFor="form6Example2">
                    Rut Funcionario
                  </label>
                  <input
                    placeholder="12345678-9"
                    type="text"
                    id="rut_funcionario"
                    name="rut_funcionario"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handlerBlur}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12 col-sm-8 mb-3">
                  <label className="form-label" htmlFor="form6Example1">
                    Email Funcionario
                  </label>
                  <input
                    placeholder="Ingrese nombre completo"
                    type="text"
                    id="email_funcionario"
                    name="email_funcionario"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handlerBlur}
                  />
                </div>
                <div className="col-12 col-sm-4">
                  <label className="form-label" htmlFor="form6Example2">
                    Telefono Funcionario
                  </label>
                  <input
                    placeholder="912345678"
                    type="text"
                    id="fono_funcionario"
                    name="fono_funcionario"
                    className="form-control"
                    onChange={handleChange}
                    onBlur={handlerBlur}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12 col-sm-12">
                  <label className="form-label" htmlFor="form6Example1">
                    Tipo Estamento
                  </label>
                  <SelectPicker
                    searchable={false}
                    size="md"
                    placeholder="Seleccione tipo de estamento del funcionario"
                    style={{ width: "100%" }}
                    id="tipo_estamento"
                    onChange={(e) => handleChange(e, "tipo_estamento")}
                    onBlur={handlerBlur}
                    data={[
                      {
                        label: "Academico",
                        value: "academico",
                      },
                      {
                        label: "No academico",
                        value: "no academico",
                      },
                      {
                        label: "Ex-funcionario",
                        value: "ex funcionario",
                      },
                      {
                        label: "Excepcion especial",
                        value: "excepcion especial",
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12 col-sm-12">
                  <label className="form-label" htmlFor="form6Example1">
                    Comentarios departamento de personas
                  </label>
                  <textarea
                    placeholder="Agregue cualquier información adicional para cobranzas"
                    onChange={handleChange}
                    onBlur={handlerBlur}
                    className="form-control"
                    id="comentario_dpe"
                    name="comentario_dpe"
                    rows={4}
                  ></textarea>
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12 col-sm-12 text-center">
                  <ButtonToolbar>
                    <Button className="px-5 mx-5 boton-enviar" type="submit">
                      Enviar
                    </Button>
                    <Button
                      onClick={() => router.back()}
                      className="px-5 mx-5 boton-cancelar"
                    >
                      Cancelar
                    </Button>
                  </ButtonToolbar>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default CrearSolicitudEspecial;
