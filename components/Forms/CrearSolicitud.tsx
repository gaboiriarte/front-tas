import router, { useRouter } from "next/router";
import React, { useState, useEffect, useContext, ReactNode } from "react";
import { Button, ButtonToolbar, SelectPicker, Uploader } from "rsuite";
import { AuthContext } from "../../context/AuthConext";
import getPeriodos from "../../hooks/useGetPeriodos";
import postSolicitud from "../../hooks/usePostSolicitud";
import useValidation from "../../hooks/useValidation";
import crearSolicitudValidation from "../../validations/crearSolicitudValidation";
import { formatoRut, validarRut } from "../../validations/validarRut";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Loader } from "rsuite";
import { ToastContainer, toast } from "react-toastify";
import InputMask from "react-input-mask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePdf } from "@fortawesome/free-solid-svg-icons";
import getUsersDPE from "../../hooks/useGetUserDPE";
import UseNotification from "../../hooks/useNotification";
import UseCheckLogin from "../../hooks/useCheckLogin";

const STATE_INIT = {
  name_benef: "",
  rut_benef: "",
  carrera_benef: "",
  type_benef: "",
  anio: "",
  comentario_funcionario: "",
  documentacion: [],
  documentacion2: [],
};

const CrearSolicitud = () => {
  const { authState } = useContext(AuthContext);
  const [aniosObject, setAniosObject]: any = useState([]);
  const [isLoged, setIsLoged] = useState(false);
  const MySwal = withReactContent(Swal);
  const router = useRouter();

  const fetchSolicitudApi = async () => {
    MySwal.fire({
      title: "¿Enviar solicitud?",
      text: "Una vez enviada puede editar esta desde la opción de mis solicitudes",
      icon: "info",
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#003057",
      cancelButtonColor: "#da291c",
      confirmButtonText: "Aceptar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoged(true);
        //@ts-ignore
        let user_id: string = authState.id;

        const submitSolicitud = await postSolicitud(
          name_benef,
          formatoRut(rut_benef),
          carrera_benef,
          type_benef,
          anio,
          comentario_funcionario,
          documentacion,
          documentacion2,
          user_id
        );
        if (submitSolicitud.mensaje === "Solicitud creada con exito") {
          const getUserDPE = await getUsersDPE();
          //convert array to string
          const getUserActual = await UseCheckLogin();
          let concurrentEmail = null;
      
          if (getUserDPE.length > 0) {
            let emailsDPE = "";
            await getUserDPE.map((item: any) => {
              emailsDPE += item.email + ",";
              return true;
            });
            emailsDPE = emailsDPE.substring(0, emailsDPE.length - 1);
            await UseNotification(
              emailsDPE,
              "Nueva Solicitud Plataforma Beca Hijo de funcionario [Dirección de Personas]",
              "Alguien ha realizado una nueva solicitud para la plataforma Beca Hijo de funcionario, ingrese a la plataforma para ver los detalles."
            );
          }

          //delay para que se envie el correo (el servidor de correos no soporta conexiones concurrentes)
          setTimeout(async () => {
            if (getUserActual) {
              concurrentEmail = await UseNotification(
                getUserActual.email,
                "Su solicitud se ha creado con éxito [Plataforma Beca hijo de funcionario]",
                "Su solicitud se ha creado con éxito, en la plataforma podrá revisar el estado de su solicitud."
              );
            }
          }, 1000);

          router.push({ pathname: "/panel", query: { ok: true } });
        } else if (
          submitSolicitud.mensaje ===
          "Alumno con solicitud pendiente en sistema"
        ) {
          setIsLoged(false);
          toast.error(submitSolicitud.mensaje);
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
    useValidation(STATE_INIT, crearSolicitudValidation, fetchSolicitudApi);
  let {
    name_benef,
    rut_benef,
    carrera_benef,
    type_benef,
    anio,
    comentario_funcionario,
    documentacion,
    documentacion2,
  } = values;

  return (
    <div className="container">
      {isLoged ? (
        <Loader size="lg" backdrop content="Cargando..." vertical />
      ) : (
        <div className="card card-form shadow-1 mt-2 mb-4">
          <div className="card-header">
            <p className="text-center">Crear Solicitud</p>
          </div>
          <div className="card-body">
            <form onSubmit={handlerSubmit}>
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
                    Carrera Beneficiario
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
                    placeholder="Agregue información adicional para personal del Departamento de Personas o Cobranzas"
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

              <div className="row mb-3">
                <div className="col-12 col-sm-12 text-center">
                  <ButtonToolbar>
                    <Button className="px-5 mx-5 boton-enviar" type="submit">
                      Enviar
                    </Button>
                    <Button
                      onClick={() => router.push("/panel")}
                      className="px-5 mx-5 boton-cancelar"
                    >
                      Cancelar
                    </Button>
                  </ButtonToolbar>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CrearSolicitud;
