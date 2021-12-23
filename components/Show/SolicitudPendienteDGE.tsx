import { faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Col, Loader, Row, List, Steps, Button, ButtonToolbar } from "rsuite";
import GetSolicitud from "../../hooks/useGetSolicitud";
import { host } from "../../host/host";
import AprobarDGE from "../Forms/AprobarDGE";
import RechazarDGE from "../Forms/RechazarDGE";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import changeStatusSolicitudDGE from "../../hooks/usePostChangeStatusSolicitudDGE";

const SolicitudPendienteDGE = ({ id, role }: any) => {
  const [data, setData]: any = useState({});
  const [isLoged, setIsLoged] = useState(true);
  const [status, setStatus] = useState(0);
  const [mensajeDPE, setMensajeDPE] = useState("");
  const [mensajeCobranza, setMensajeCobranza] = useState("");
  const [mensajeDGE, setMensajeDGE] = useState("");
  const [statusError, setStatusError] = useState(false);
  const [documentacion, setDocumentacion] = useState([]);
  const router = useRouter();
  const MySwal = withReactContent(Swal);

  const modalSweet = (estadoSolicitud: boolean) => {
    estadoSolicitud
      ? MySwal.fire({
          html: <AprobarDGE id={id} />,
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          confirmButtonColor: "#003057",
          cancelButtonColor: "#da291c",
          confirmButtonText: "Confirmar",
          showLoaderOnConfirm: true,
          preConfirm: () => {
            const comentario_dge =
              //@ts-ignore
              document.getElementById("comentario_dge")?.value;
            if (comentario_dge === "") {
              MySwal.showValidationMessage("Debe ingresar algún comentario");
            } else {
              return changeStatusSolicitudDGE(id, "2", comentario_dge);
            }
          },
          allowOutsideClick: () => !MySwal.isLoading(),
        }).then((result) => {
          if (!result.isConfirmed) {
            return;
          } else if (result.value.mensaje === "cambio con exito") {
            MySwal.fire({
              title: `Solicitud aprobada`,
              timer: 1000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading();
              },
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                router.back();
              }
            });
          }
        })
      : MySwal.fire({
          html: <RechazarDGE id={id} />,
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          confirmButtonColor: "#003057",
          cancelButtonColor: "#da291c",
          confirmButtonText: "Confirmar",
          showLoaderOnConfirm: true,
          preConfirm: () => {
            const comentario_dge =
              //@ts-ignore
              document.getElementById("comentario_dge")?.value;
            if (comentario_dge === "") {
              MySwal.showValidationMessage("Debe ingresar algún comentario");
            } else {
              return changeStatusSolicitudDGE(id, "3", comentario_dge);
            }
          },
          allowOutsideClick: () => !MySwal.isLoading(),
        }).then((result) => {
          if (!result.isConfirmed) {
            return;
          } else if (result.value.mensaje === "cambio con exito") {
            MySwal.fire({
              title: `Solicitud rechazada`,
              timer: 1000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading();
              },
            }).then((result) => {
              /* Read more about handling dismissals below */
              if (result.dismiss === Swal.DismissReason.timer) {
                router.back();
              }
            });
          }
        });
  };

  const calcEstado = (
    estadoDPE: number,
    estadoCobranza: number,
    estadoDGE: number
  ) => {
    switch (estadoDPE) {
      case 0:
        setStatus(0);
        return;
        break;
      case 1:
        setStatus(1);
        setMensajeDPE("En Revisión");
        return;
        break;
      case 2:
        switch (estadoCobranza) {
          case 1:
            setStatus(2);
            setMensajeCobranza("En Revisión");
            return;
            break;
          case 2:
            switch (estadoDGE) {
              case 1:
                setStatus(3);
                setMensajeDGE("En revisión");
                return;
                break;
              case 2:
                setStatus(4);
                setMensajeDGE("Aprobada");
                return;
                break;
              case 3:
                setStatus(3);
                setStatusError(true);
                setMensajeDGE("Rechazada");
                return;
                break;
              case 4:
                setStatus(3);
                setMensajeDGE("Pendiente");
                return;
                break;
              case 5:
                setStatus(3);
                setMensajeDGE("Recepcionada");
                return;
                break;

              default:
                break;
            }
            break;
          case 3:
            setStatus(2);
            setStatusError(true);
            setMensajeCobranza("Rechazada");
            return;
            break;
          case 5:
            setStatus(2);
            setMensajeCobranza("Recepcionada");
            return;
            break;

          default:
            break;
        }
      case 3:
        setStatus(1);
        setStatusError(true);
        setMensajeCobranza("Rechazada");
        return;
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    async function LoadData() {
      const peticion = await GetSolicitud(id);
      console.log(peticion);
      setData(peticion);
      setIsLoged(false);
      setDocumentacion(JSON.parse(peticion.documentacion));
      calcEstado(
        peticion.status_dpe,
        peticion.status_cobranza,
        peticion.status_dge
      );
    }
    LoadData();
  }, []);
  return (
    <>
      <Row className="show-grid m-4">
        <Col xs={24}>
          <div className="card card-form shadow-1 mt-2">
            <div className="card-header">
              <p className="mx-5">Datos del funcionario</p>
            </div>
            <div className="card-body">
              {isLoged ? (
                <div className="container text-center">
                  <Loader size="lg" content="Cargando..." vertical />
                </div>
              ) : (
                <List size="sm">
                  <List.Item>
                    Nombre: <pre style={{ display: "inline" }}>&#09;</pre>
                    <span className="font-weight-bold">{data.user.name}</span>
                  </List.Item>
                  <List.Item>
                    Rut: <pre style={{ display: "inline" }}>&#09;&#09;</pre>
                    <span className="font-weight-bold">{data.user.rut}</span>
                  </List.Item>
                  <List.Item>
                    Email: <pre style={{ display: "inline" }}>&#09;&#09;</pre>
                    <span className="font-weight-bold">{data.user.email}</span>
                  </List.Item>
                  <List.Item>
                    Teléfono: <pre style={{ display: "inline" }}>&#09;&#09;</pre>
                    <span className="font-weight-bold">
                      {data.user.telefono}
                    </span>
                  </List.Item>
                  <List.Item>
                    Departamento: <pre style={{ display: "inline" }}>&#09;</pre>
                    <span className="font-weight-bold">{data.user.depto}</span>
                  </List.Item>
                </List>
              )}
            </div>
            <div className="card-header">
              <p className="mx-5">Datos del Alumno</p>
            </div>
            <div className="card-body">
              {isLoged ? (
                <div className="container text-center">
                  <Loader size="lg" content="Cargando..." vertical />
                </div>
              ) : (
                <List size="sm">
                  <List.Item>
                    Nombre Estudiante:{" "}
                    <pre style={{ display: "inline" }}>&#09;</pre>
                    <span className="font-weight-bold">{data.name_benef}</span>
                  </List.Item>
                  <List.Item>
                    Rut Estudiante:{" "}
                    <pre style={{ display: "inline" }}>&#09;&#09;</pre>
                    <span className="font-weight-bold">{data.rut_benef}</span>
                  </List.Item>
                  <List.Item>
                    Carrera: <pre style={{ display: "inline" }}>&#09;&#09;</pre>
                    <span className="font-weight-bold">
                      {data.carrera_benef}
                    </span>
                  </List.Item>
                  <List.Item>
                    Fecha de creación:{" "}
                    <pre style={{ display: "inline" }}>&#09;</pre>
                    <span className="font-weight-bold">
                      {new Date(data.created_at).toLocaleDateString("es-ES")}
                    </span>
                  </List.Item>
                  <List.Item>
                    Estado de solicitud:{" "}
                    <pre style={{ display: "inline" }}>&#09;</pre>
                    <Steps
                      current={status}
                      currentStatus={statusError ? "error" : "process"}
                    >
                      <Steps.Item title="Recepcionada" />
                      <Steps.Item
                        title="Dirección de Personas"
                        description={mensajeDPE}
                      />
                      <Steps.Item
                        title="Cobranzas"
                        description={mensajeCobranza}
                      />
                      <Steps.Item title="DGE" description={mensajeDGE} />
                    </Steps>
                  </List.Item>
                  <List.Item>
                    Documentación:{" "}
                    <pre style={{ display: "inline" }}>&#09;</pre>
                    <div className="row">
                      {documentacion.map((documento, i) => (
                        <div
                          key={i}
                          className="col d-flex align-items-center mx-3"
                        >
                          <FontAwesomeIcon key={i} icon={faFileAlt} size="2x" />{" "}
                          <span className="align-self-center mx-2">
                            <a href={host + "/storage/docs/" + documento}>
                              Documento{" " + (i + 1)}
                            </a>
                          </span>{" "}
                        </div>
                      ))}
                    </div>
                  </List.Item>
                </List>
              )}
            </div>
            <div className="card-header">
              <p className="mx-5">Detalles adicionales</p>
            </div>
            <div className="card-body">
              {isLoged ? (
                <div className="container text-center">
                  <Loader size="lg" content="Cargando..." vertical />
                </div>
              ) : (
                <List>
                  {data.comentario_funcionario && (
                    <List.Item>
                      Comentarios del funcionario:{" "}
                      <pre style={{ display: "inline" }}>&#09;&#09;</pre>
                      <span className="font-weight-bold">
                        {data.comentario_funcionario}
                      </span>
                    </List.Item>
                  )}
                  {data.comentario_dpe && (
                    <List.Item>
                      Comentarios Dirección de Personas:{" "}
                      <pre style={{ display: "inline" }}>&#09;</pre>
                      <span className="font-weight-bold">
                        {data.comentario_dpe}
                      </span>
                    </List.Item>
                  )}
                  {data.comentario_cobranza && (
                    <List.Item>
                      Comentarios Cobranzas:{" "}
                      <pre style={{ display: "inline" }}>&#09;&#09;&#09;</pre>
                      <span className="font-weight-bold">
                        {data.comentario_cobranza}
                      </span>
                    </List.Item>
                  )}
                  {data.comentario_dge && (
                    <List.Item>
                      Comentarios Dirección General Estudiantil:{" "}
                      <pre style={{ display: "inline" }}></pre>
                      <span className="font-weight-bold">
                        {data.comentario_dge}
                      </span>
                    </List.Item>
                  )}
                  {data.comentario_dpe ||
                  data.comentario_cobranza ||
                  data.comentario_dge ||
                  data.comentario_funcionario ? null : (
                    <List.Item>
                      <pre style={{ display: "inline" }}>&#09;</pre>
                      <span className="font-weight-bold">
                        Solicitud sin comentarios
                      </span>
                    </List.Item>
                  )}
                </List>
              )}
            </div>
            {role === "dge" && (
              <div className="card-body">
                <div className="row mb-3">
                  <div className="col-12 col-sm-12 text-center">
                    <ButtonToolbar>
                      <Button
                        className="px-3 mx-3 boton-enviar"
                        type="button"
                        onClick={() => modalSweet(true)}
                      >
                        Aprobar solicitud
                      </Button>
                      <Button
                        type="button"
                        className="px-3 mx-3 boton-cancelar"
                        onClick={() => modalSweet(false)}
                      >
                        Rechazar solicitud
                      </Button>
                    </ButtonToolbar>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Col>
      </Row>
    </>
  );
};

export default SolicitudPendienteDGE;
