import { host } from "../host/host";
const LoadPendientes = async (page: number) => {
  const url =
    host +
    "/api/v1/solicitud/get-all-pendientes" +
    "?page=" +
    page +
    "&limit=5";
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
    return data;
  } catch (e) {
    error = "error conexion";
    return error;
  }
};

export default LoadPendientes;
