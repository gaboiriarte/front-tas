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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import getUsersCobranza from "../../hooks/useGetUserCobranza";
import UseNotification from "../../hooks/useNotification";

const STATE_INIT = {
  name_benef: "",
  rut_benef: "",
  carrera_benef: "",
  type_benef: "",
  anio: "",
  comentario_funcionario: "",
  documentacion: [],
  documentacion2: [],
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
          documentacion2,
          name_funcionario,
          rut_funcionario,
          email_funcionario,
          fono_funcionario,
          tipo_estamento,
          comentario_dpe
        );
        if (submitSolicitud.mensaje === "Solicitud creada con exito") {
          const cobranzaUsers = await getUsersCobranza();

          if (cobranzaUsers.length > 0) {
            let emailsDPE = "";
            await cobranzaUsers.map((item: any) => {
              emailsDPE += item.email + ",";
              return true;
            });
            emailsDPE = emailsDPE.substring(0, emailsDPE.length - 1);
            await UseNotification(
              emailsDPE,
              "Nueva Solicitud Plataforma Beca Hijo de funcionario [Cobranzas]",
              "Se ha recibido una nueva solicitud para la plataforma Beca Hijo de funcionario, ingrese a la plataforma para ver los detalles."
            );
          }
          //delay para que se envie el correo (el servidor de correos no soporta conexiones concurrentes)
          setTimeout(async () => {
            await UseNotification(
              email_funcionario,
              "Nueva Solicitud Plataforma Beca Hijo de funcionario",
              "Se ha ingresado una solicitud para la plataforma Beca Hijo de funcionario" +
                "\n" +
                "\n" +
                "Beneficiado: " +
                name_benef +
                "\n" +
                "\n" +
                "Rut Beneficiado: " +
                formatoRut(rut_benef) +
                "\n" +
                "\n" +
                "Carrera: " +
                carrera_benef +
                "\n" +
                "\n" +
                "Tipo: " +
                type_benef +
                "\n" +
                "\n" +
                "Año: " +
                anio
            );
          }, 200);

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
        } else if (submitSolicitud.errors) {
          setIsLoged(false);
          toast.error("Los documentos deben ser formato pdf o doc");
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
    documentacion2,
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
                    Rut del Beneficiario
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
                <div className="col-12 col-sm-4">
                  <label className="form-label" htmlFor="form6Example1">
                    Tipo de matrícula
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
                    Carrera del Beneficiario
                  </label>
                  <SelectPicker
                    searchable={true}
                    size="md"
                    placeholder="Seleccione carrera"
                    style={{ width: "100%" }}
                    id="carrera_benef"
                    onChange={(e) => handleChange(e, "carrera_benef")}
                    onBlur={handlerBlur}
                    data={[
                      {
                        label: "Arquitectura",
                        value: "Arquitectura",
                      },
                      {
                        label: "Derecho",
                        value: "Derecho",
                      },
                      {
                        label: "Geología",
                        value: "Geología",
                      },
                      {
                        label: "Ingeniería Civil Ambiental",
                        value: "Ingeniería Civil Ambiental",
                      },
                      {
                        label: "Ingeniería Civil de Minas",
                        value: "Ingeniería Civil de Minas",
                      },
                      {
                        label: "Ingeniería Civil en Computación e Informática",
                        value: "Ingeniería Civil en Computación e Informática",
                      },
                      {
                        label: "Ingeniería Civil Industrial",
                        value: "Ingeniería Civil Industrial",
                      },
                      {
                        label: "Ingeniería Civil Metalúrgica",
                        value: "Ingeniería Civil Metalúrgica",
                      },
                      {
                        label: "Ingeniería Civil Plan Común",
                        value: "Ingeniería Civil Plan Común",
                      },
                      {
                        label: "Ingeniería Civil Química",
                        value: "Ingeniería Civil Química",
                      },
                      {
                        label: "Ingeniería Comercial",
                        value: "Ingeniería Comercial",
                      },
                      {
                        label: "Ingeniería en Computación e Informática",
                        value: "Ingeniería en Computación e Informática",
                      },
                      {
                        label: "Ingeniería en Información y Control de Gestión",
                        value: "Ingeniería en Información y Control de Gestión",
                      },
                      {
                        label: "Ingeniería en Metalurgia",
                        value: "Ingeniería en Metalurgia",
                      },
                      {
                        label: "Ingeniería en Tecnologías de Información",
                        value: "Ingeniería en Tecnologías de Información",
                      },
                      {
                        label: "Kinesiología",
                        value: "Kinesiología",
                      },
                      {
                        label:
                          "Licenciatura en Física con mención en Astronomía",
                        value:
                          "Licenciatura en Física con mención en Astronomía",
                      },
                      {
                        label: "Licenciatura en Matemática",
                        value: "Licenciatura en Matemática",
                      },
                      {
                        label: "Medicina",
                        value: "Medicina",
                      },
                      {
                        label: "Nutrición y Dietética",
                        value: "Nutrición y Dietética",
                      },
                      {
                        label:
                          "Pedagogía en Educación Básica con Especialización",
                        value:
                          "Pedagogía en Educación Básica con Especialización",
                      },
                      {
                        label: "Pedagogía en Inglés",
                        value: "Pedagogía en Inglés",
                      },
                      {
                        label: "Pedagogía en Matemática en Educación Media",
                        value: "Pedagogía en Matemática en Educación Media",
                      },
                      {
                        label: "Periodismo",
                        value: "Periodismo",
                      },
                      {
                        label: "Psicología",
                        value: "Psicología",
                      },
                      {
                        label: "Química y Farmacia",
                        value: "Química y Farmacia",
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12 col-sm-12">
                  <label className="form-label" htmlFor="form6Example1">
                    Información adicional sobre la solicitud
                  </label>
                  <textarea
                    placeholder="Agregue información adicional del alumno o funcionario"
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
                <div className="col-12 col-sm-6">
                  <label className="form-label" htmlFor="form6Example1">
                    Comprobante de pago
                  </label>
                  <Uploader
                    onChange={(e) => handleChange(e, "documentacion")}
                    action={"/"}
                    draggable
                  >
                    <div style={{ width: "100%", height: 50 }}>
                      <i>Arrastre o haga clic</i>
                      <FontAwesomeIcon
                        className="icono__panel pl-4"
                        size="2x"
                        icon={faFilePdf}
                      />
                    </div>
                  </Uploader>
                </div>
                <div className="col-12 col-sm-6">
                  <label className="form-label" htmlFor="form6Example1">
                    Documentación (Opcional)
                  </label>
                  <Uploader
                    onChange={(e) => handleChange(e, "documentacion2")}
                    action={"/"}
                    draggable
                  >
                    <div style={{ width: "100%", height: 50 }}>
                      <i>Adjunte documentación adicional</i>
                      <FontAwesomeIcon
                        className="icono__panel pl-4"
                        size="2x"
                        icon={faFilePdf}
                      />
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
                    Rut del Funcionario
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
                    Email del Funcionario
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
                    Teléfono del Funcionario
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
                    Tipo de Estamento del funcionario
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
                        label: "Académico",
                        value: "academico",
                      },
                      {
                        label: "No académico",
                        value: "no academico",
                      },
                      {
                        label: "Ex-funcionario",
                        value: "ex funcionario",
                      },
                      {
                        label: "Excepción especial",
                        value: "excepcion especial",
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="row mb-3">
                <div className="col-12 col-sm-12">
                  <label className="form-label" htmlFor="form6Example1">
                    Comentarios adicionales para departamento de cobranza
                  </label>
                  <textarea
                    placeholder="Agregue información adicional para cobranzas"
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
