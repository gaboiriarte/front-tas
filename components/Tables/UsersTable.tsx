import {
  faArrowAltCircleDown,
  faDownload,
  faEye,
  faTrash,
  faUserCog,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { Divider, IconButton, Popover, Whisper, Pagination } from "rsuite";
import getUsers from "../../hooks/useGetAllUsers";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ChangeRol from "../../hooks/useChangeRol";
import ModificarRol from "../Forms/ModificarRol";

const UsersTable = () => {
  const [isLoged, setIsLoged] = useState(false);
  const router = useRouter();
  const [data, setData]: any = useState([]);
  const [activePage, setActivePage] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const MySwal = withReactContent(Swal);

  const modalRol = (id: string) => {
    MySwal.fire({
      html: <ModificarRol />,
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#003057",
      cancelButtonColor: "#da291c",
      confirmButtonText: "Confirmar",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const rol =
          //@ts-ignore
          document.getElementById("rol")?.value;
        if (rol === "") {
          MySwal.showValidationMessage("Ingrese rol");
        } else {
          return ChangeRol(id, rol);
        }
      },
      allowOutsideClick: () => !MySwal.isLoading(),
    }).then((result) => {
      if (!result.isConfirmed) {
        return;
      } else if (result.value.mensaje === "cambio con exito") {
        MySwal.fire({
          title: `Rol Actualizado`,
          timer: 1000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
          },
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            router.reload();
          }
        });
      }
    });
  };

  useEffect(() => {
    setIsLoged(false);
    async function llenarTabla() {
      const peticion = await getUsers(activePage);
      console.log(peticion);
      if (peticion === "error conexion") {
        router.push("/");
      } else if (Array.isArray(peticion.data)) {
        setData(peticion.data);
        setTotal(peticion.total);
        setIsLoged(true);
      } else if (peticion.message) {
        router.push("/");
      } else if (typeof peticion.data === "object") {
        setData(Object.values(peticion.data));
        setTotal(peticion.total);
        setIsLoged(true);
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
              <th scope="col">Rut</th>
              <th scope="col">Nombre</th>
              <th scope="col">Email</th>
              <th scope="col">Rol</th>
              <th scope="col">Modificar</th>
            </tr>
          </thead>

          {isLoged ? (
            data.length === 0 ? (
              <tbody>
                <tr>
                  <th colSpan={5} className="text-center">
                    Sin usuarios
                  </th>
                </tr>
              </tbody>
            ) : (
              <tbody>
                {data.map((user: any, i: number) => (
                  <tr key={i}>
                    <th>{user.rut}</th>
                    <th>{user.name}</th>
                    <th>{user.email}</th>
                    {user.rol === "funcionario" && <th>Funcionario</th>}
                    {user.rol === "dpe" && <th>Enc. dirección de personas</th>}
                    {user.rol === "dge" && (
                      <th>Enc. dirección general estudiantil</th>
                    )}
                    {user.rol === "cobranza" && <th>Encargado cobranza</th>}
                    <th>
                      <Whisper
                        placement="top"
                        trigger="hover"
                        controlId="control-id-hover"
                        speaker={<Popover title="Modificar rol"></Popover>}
                      >
                        <IconButton
                          className="mx-1"
                          icon={
                            <FontAwesomeIcon
                              onClick={() => modalRol(user.id)}
                              color="white"
                              icon={faUserCog}
                            />
                          }
                          style={{ backgroundColor: "#003057" }}
                          color="blue"
                          circle
                        />
                      </Whisper>
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

export default UsersTable;
