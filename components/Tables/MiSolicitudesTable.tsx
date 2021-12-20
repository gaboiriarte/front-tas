import Icon from "@rsuite/icons/lib/Icon";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { IconButton, Pagination, Popover, Whisper, Divider } from "rsuite";
import LoadSolicitudes from "../../hooks/useLoadSolicitudes";
import {
  faDownload,
  faEye,
  faSort,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { constants } from "fs";
import DeleteSolicitud from "../../hooks/useDeleteSolicitud";

const MiSolicitudesTable = () => {
  const [isLoged, setIsLoged] = useState(false);
  const router = useRouter();
  const [data, setData]: any = useState([]);
  const [activePage, setActivePage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const MySwal = withReactContent(Swal);

  const modalDelete = (idSolicitud: String) => {
    MySwal.fire({
      title: "¿Eliminar Solicitud?",
      text: "Esta acción es irreversible",
      icon: "info",
      showCancelButton: true,
      cancelButtonText: "Mantener",
      confirmButtonColor: "#da291c",
      cancelButtonColor: "#003057",
      confirmButtonText: "Eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setIsLoged(false);
        const peticion = await DeleteSolicitud(idSolicitud);

        if (peticion.mensaje === "solicitud eliminada") {
          router.reload();
        }
        // ingresar verificaciones de backend!!!
      }
    });
  };

  useEffect(() => {
    setIsLoged(false);
    async function llenarTabla() {
      const peticion = await LoadSolicitudes(activePage);
      console.log(peticion);
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
              <th scope="col">
                Nº Solicitud{" "}
                <span className="mx-2">
                  <FontAwesomeIcon icon={faSort} />
                </span>
              </th>
              <th scope="col">
                Fecha{" "}
                <span className="mx-2">
                  <FontAwesomeIcon icon={faSort} />
                </span>
              </th>
              <th scope="col">Nombre</th>
              <th scope="col">Rut</th>
              <th scope="col">
                Estado{" "}
                <span className="mx-2">
                  <FontAwesomeIcon icon={faSort} />
                </span>
              </th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>

          {isLoged ? (
            data.length === 0 ? (
              <tbody>
                <tr>
                  <th colSpan={4} className="text-center">
                    Sin Solicitudes
                  </th>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {data.map((solicitud: any, i: number) => (
                  <tr key={i}>
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
                            onClick={() => modalDelete(solicitud.id)}
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
                  </tr>
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

export default MiSolicitudesTable;
