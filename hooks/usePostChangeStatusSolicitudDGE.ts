import { host } from "../host/host";
const changeStatusSolicitudDGE = async (
  id: string,
  status_dge: string,
  comentario_dge: string
) => {
  const url = host + "/api/v1/solicitud/cambiar-estado-dge/" + id;
  let error = "";
  const formData = new FormData();
  formData.append("status_dge", status_dge);
  formData.append("comentario_dge", comentario_dge);
  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
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

export default changeStatusSolicitudDGE;
