import {
  faArrowAltCircleDown,
  faDownload,
  faEye,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Divider, IconButton, Popover, Whisper, Pagination } from "rsuite";
import LoadSolicitudesDPE from "../../hooks/useLoadSolicitudesDPE";

const NuevasSolicitudesDPE = () => {
  const [isLoged, setIsLoged] = useState(false);
  const router = useRouter();
  const [data, setData]: any = useState([]);
  const [activePage, setActivePage] = React.useState(1);
  const [total, setTotal] = React.useState(0);

  useEffect(() => {
    setIsLoged(false);
    async function llenarTabla() {
      const peticion = await LoadSolicitudesDPE(activePage);
      console.log(peticion.data);
      if (peticion === "error conexion") {
        router.push("/");
      } else if (Array.isArray(peticion.data)) {
        setData(peticion.data);
        setTotal(peticion.total);
        setIsLoged(true);
      } else if (peticion.message) {
        router.push("/");
      }
    }
    llenarTabla();
  }, [activePage]);

  return (
    <>
      <div className="container text-nowrap overflow-auto">
        <table className="table table-borderless table-hover">
          <thead>
            <tr>
              <th scope="col">Rut Funcionario </th>
              <th scope="col">Nombre Funcionario</th>
              <th scope="col">Cantidad de solicitudes pendientes</th>
              <th scope="col">Expandir</th>
            </tr>
          </thead>

          {isLoged ? (
            data.length === 0 ? (
              <tbody>
                <tr>
                  <th colSpan={4} className="text-center">
                    Sin solicitudes pendientes Departamento de Personas
                  </th>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {data.map((user: any, i: number) => (
                  <>
                    {user.solicitudes_pendientes_d_p_e.length !== 0 ? (
                      <>
                        <tr
                          key={i}
                          className="accordion-toggle"
                          data-mdb-toggle="collapse"
                          data-mdb-target={"#collapseExample" + i}
                          aria-expanded="false"
                          aria-controls="collapseExample"
                        >
                          <th>{user.rut}</th>
                          <th>{user.name}</th>
                          <th>{user.solicitudes_pendientes_d_p_e.length}</th>
                          <th>
                            <Whisper
                              placement="top"
                              trigger="hover"
                              controlId="control-id-hover"
                              speaker={
                                <Popover title="Ver solicitudes asociadas a este usuario"></Popover>
                              }
                            >
                              <IconButton
                                className="mx-1"
                                icon={
                                  <FontAwesomeIcon
                                    color="white"
                                    icon={faArrowAltCircleDown}
                                  />
                                }
                                style={{ backgroundColor: "#003057" }}
                                color="blue"
                                circle
                              />
                            </Whisper>
                          </th>
                        </tr>
                        <tr>
                          <td colSpan={4}>
                            <div
                              className="accordion-body collapse container-fluid"
                              id={"collapseExample" + i}
                            >
                              <table className="table table-striped table-bordered">
                                <thead>
                                  <tr>
                                    <th>Nº Solicitud</th>
                                    <th>Nombre Alumno</th>
                                    <th>Rut Alumno</th>
                                    <th>Estado</th>
                                    <th>Acciones</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {user.solicitudes_pendientes_d_p_e.map(
                                    (solicitud: any, z: any) => (
                                      <tr key={z}>
                                        <td>{solicitud.id}</td>
                                        <td>{solicitud.name_benef}</td>
                                        <td>{solicitud.rut_benef}</td>
                                        {solicitud.status_dpe === 0 ? (
                                          <th className="text-warning font-weight-bold">
                                            <Whisper
                                              placement="top"
                                              trigger="hover"
                                              controlId="control-id-hover"
                                              speaker={
                                                <Popover title="Tu solicitud fue enviada al sistema con éxito, una vez revisada te llegará una notificación"></Popover>
                                              }
                                            >
                                              <p>Recepcionada</p>
                                            </Whisper>
                                          </th>
                                        ) : solicitud.status_dge === 2 ? (
                                          <th className="text-success font-weight-bold">
                                            <Whisper
                                              placement="top"
                                              trigger="hover"
                                              controlId="control-id-hover"
                                              speaker={
                                                <Popover title="Tu solicitud se encuentra aprobada, puedes descargar el comprobante mediante el boton de descarga"></Popover>
                                              }
                                            >
                                              <p>Aprobada</p>
                                            </Whisper>
                                          </th>
                                        ) : solicitud.status_dpe === 3 ||
                                          solicitud.status_cobranza === 3 ||
                                          solicitud.status_dge === 3 ? (
                                          <th className="text-danger font-weight-bold">
                                            <Whisper
                                              placement="top"
                                              trigger="hover"
                                              controlId="control-id-hover"
                                              speaker={
                                                <Popover title="Tu solicitud fué rechazada, para ver el motivo presiona ver"></Popover>
                                              }
                                            >
                                              <p>Rechazada</p>
                                            </Whisper>
                                          </th>
                                        ) : (
                                          <th className="text-info font-weight-bold">
                                            <Whisper
                                              placement="top"
                                              trigger="hover"
                                              controlId="control-id-hover"
                                              speaker={
                                                <Popover title="Tu solicitud se encuentra en proceso de verificación, una vez aprobada llegará una notificación a tu correo"></Popover>
                                              }
                                            >
                                              <p>En Revisión</p>
                                            </Whisper>
                                          </th>
                                        )}
                                        <td>
                                          <Whisper
                                            placement="top"
                                            trigger="hover"
                                            controlId="control-id-hover"
                                            speaker={
                                              <Popover title="Ver Solicitud en detalle"></Popover>
                                            }
                                          >
                                            <IconButton
                                              href={
                                                "/panel/nuevas-solicitudes/" +
                                                solicitud.id
                                              }
                                              icon={
                                                <FontAwesomeIcon
                                                  color="white"
                                                  icon={faEye}
                                                />
                                              }
                                              style={{
                                                backgroundColor: "#003057",
                                              }}
                                              color="blue"
                                              circle
                                            />
                                          </Whisper>
                                        </td>
                                      </tr>
                                    )
                                  )}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      </>
                    ) : null}

                    {/* <tr key={i}>
                    <th>{solicitud.id}</th>
                    <th>
                      {new Date(solicitud.created_at).toLocaleDateString(
                        "es-ES"
                      )}
                    </th>
                    <th>{solicitud.name_benef}</th>
                    <th>{solicitud.rut_benef}</th>
                    {solicitud.status_dpe === 0 ? (
                      <th className="text-warning font-weight-bold">
                        <Whisper
                          placement="top"
                          trigger="hover"
                          controlId="control-id-hover"
                          speaker={
                            <Popover title="Tu solicitud fue enviada al sistema con éxito, una vez revisada te llegará una notificación"></Popover>
                          }
                        >
                          <p>Recepcionada</p>
                        </Whisper>
                      </th>
                    ) : solicitud.status_dge === 2 ? (
                      <th className="text-success font-weight-bold">
                        <Whisper
                          placement="top"
                          trigger="hover"
                          controlId="control-id-hover"
                          speaker={
                            <Popover title="Tu solicitud se encuentra aprobada, puedes descargar el comprobante mediante el boton de descarga"></Popover>
                          }
                        >
                          <p>Aprobada</p>
                        </Whisper>
                      </th>
                    ) : solicitud.status_dpe === 3 ||
                      solicitud.status_cobranza === 3 ||
                      solicitud.status_dge === 3 ? (
                      <th className="text-danger font-weight-bold">
                        <Whisper
                          placement="top"
                          trigger="hover"
                          controlId="control-id-hover"
                          speaker={
                            <Popover title="Tu solicitud fué rechazada, para ver el motivo presiona ver"></Popover>
                          }
                        >
                          <p>Rechazada</p>
                        </Whisper>
                      </th>
                    ) : (
                      <th className="text-info font-weight-bold">
                        <Whisper
                          placement="top"
                          trigger="hover"
                          controlId="control-id-hover"
                          speaker={
                            <Popover title="Tu solicitud se encuentra en proceso de verificación, una vez aprobada llegará una notificación a tu correo"></Popover>
                          }
                        >
                          <p>En Revisión</p>
                        </Whisper>
                      </th>
                    )}
                    <th>
                      <Whisper
                        placement="top"
                        trigger="hover"
                        controlId="control-id-hover"
                        speaker={
                          <Popover title="Ver Solicitud en detalle"></Popover>
                        }
                      >
                        <IconButton
                          href={"/panel/mis-solicitudes/" + solicitud.id}
                          icon={<FontAwesomeIcon color="white" icon={faEye} />}
                          style={{ backgroundColor: "#003057" }}
                          color="blue"
                          circle
                        />
                      </Whisper>

                      {solicitud.status_dpe === 0 ? (
                        <Whisper
                          placement="top"
                          trigger="hover"
                          controlId="control-id-hover"
                          speaker={
                            <Popover title="Eliminar solicitud"></Popover>
                          }
                        >
                          <IconButton
                            className="mx-1"
                            icon={
                              <FontAwesomeIcon color="white" icon={faTrash} />
                            }
                            style={{ backgroundColor: "#da291c" }}
                            color="blue"
                            circle
                          />
                        </Whisper>
                      ) : solicitud.status_dge === 2 ? (
                        <Whisper
                          placement="top"
                          trigger="hover"
                          controlId="control-id-hover"
                          speaker={
                            <Popover title="Descargar Comprobante"></Popover>
                          }
                        >
                          <IconButton
                            className="mx-1"
                            icon={
                              <FontAwesomeIcon
                                color="white"
                                icon={faDownload}
                              />
                            }
                            style={{ backgroundColor: "#009a44" }}
                            color="blue"
                            circle
                          />
                        </Whisper>
                      ) : null}
                    </th>
                  </tr> */}
                  </>
                ))}
              </tbody>
            )
          ) : (
            <tbody>
              <tr>
                <th colSpan={4} className="text-center">
                  Cargando...
                </th>
              </tr>
            </tbody>
          )}
        </table>
      </div>
      <Divider>Página</Divider>
      <div className="container">
        <Pagination
          className="align-item-center justify-content-center mb-4"
          ellipsis
          boundaryLinks
          prev
          last
          next
          first
          size="lg"
          total={total}
          limit={5}
          maxButtons={4}
          activePage={activePage}
          onChangePage={setActivePage}
        />
      </div>
    </>
  );
};

export default NuevasSolicitudesDPE;
