import { host } from "../host/host";
const DeleteSolicitud = async (id: String) => {
  const url = host + "/api/v1/solicitud/delete/" + id;
  let error = "";
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest",
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    const data = await res.json();
    console.log(data);
    return data;
  } catch (e) {
    error = "error conexion";
    return error;
  }
};

export default DeleteSolicitud;
