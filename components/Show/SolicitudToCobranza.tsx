import { faCalendar, faFileAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Col, Loader, Row, List, Steps, Button, ButtonToolbar } from "rsuite";
import withReactContent from "sweetalert2-react-content";
import GetSolicitud from "../../hooks/useGetSolicitud";
import { host } from "../../host/host";
import Swal from "sweetalert2";
import RechazarDPE from "../Forms/RechazarDPE";
import changeStatusSolicitudCobranza from "../../hooks/usePostChangeStatusSolicitudCobranza";
import AprobarCobranza from "../Forms/AprobarCobranza";
import RechazarCobranza from "../Forms/RechazarCobranza";
import { ToastContainer, toast } from "react-toastify";
import getUsersCobranza from '../../hooks/useGetUserCobranza';

const SolicitudToCobranza = ({ id }: any) => {
  const [data, setData]: any = useState({});
  const [isLoged, setIsLoged] = useState(true);
  const [documentacion, setDocumentacion] = useState([]);
  const router = useRouter();
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    async function LoadData() {
      const peticion = await GetSolicitud(id);
      console.log(peticion);
      setData(peticion);
      setIsLoged(false);
      setDocumentacion(JSON.parse(peticion.documentacion));
    }
    async function cambiarStatus() {
      const peticion = await changeStatusSolicitudCobranza(id, "1", "", "");
    }
    LoadData();
    cambiarStatus();
  }, []);

  const modalSweet = (estadoSolicitud: boolean) => {
    estadoSolicitud
      ? MySwal.fire({
          html: <AprobarCobranza id={id} />,
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          confirmButtonColor: "#003057",
          cancelButtonColor: "#da291c",
          confirmButtonText: "Confirmar",
          showLoaderOnConfirm: true,
          preConfirm: () => {
            const comentario_cobranza =
              //@ts-ignore
              document.getElementById("comentario_cobranza")?.value;

            const estado_curricular =
              //@ts-ignore
              document.getElementById("estado_curricular")?.value;

            if (estado_curricular == "") {
              MySwal.showValidationMessage("Debe ingresar todos los datos");
            } else {
              return changeStatusSolicitudCobranza(
                id,
                "2",
                comentario_cobranza,
                estado_curricular
              );
            }
          },
          allowOutsideClick: () => !MySwal.isLoading(),
        }).then((result) => {
          console.log(result);
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
          html: <RechazarCobranza id={id} />,
          showCancelButton: true,
          cancelButtonText: "Cancelar",
          confirmButtonColor: "#003057",
          cancelButtonColor: "#da291c",
          confirmButtonText: "Confirmar",
          showLoaderOnConfirm: true,
          preConfirm: () => {
            const comentario_cobranza =
              //@ts-ignore
              document.getElementById("comentario_cobranza")?.value;
            if (comentario_cobranza === "") {
              MySwal.showValidationMessage("Debe ingresar un comentario");
            } else {
              return changeStatusSolicitudCobranza(
                id,
                "3",
                comentario_cobranza,
                ""
              );
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
                    Fecha de creación:{" "}
                    <pre style={{ display: "inline" }}>&#09;</pre>
                    <span className="font-weight-bold">
                      {new Date(data.created_at).toLocaleDateString("es-ES")}
                    </span>
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
                <List size="sm">
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
                      Comentarios Dirección de personas:{" "}
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
                      Comentarios Dirección general estudiantil:{" "}
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
            <div className="card-header">
              <p className="mx-5">Revisión cobranzas</p>
            </div>
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
          </div>
        </Col>
      </Row>
      <div className="container text-center">
        <Button onClick={router.back} className="boton-enviar mb-3 px-4">
          Volver
        </Button>
      </div>
      <ToastContainer />
    </>
  );
};

export default SolicitudToCobranza;
