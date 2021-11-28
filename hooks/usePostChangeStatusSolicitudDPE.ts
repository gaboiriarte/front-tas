import { host } from "../host/host";
const changeStatusSolicitud = async (
  id: string,
  status_dpe: string,
  comentario_dpe: string,
  tipo_estamento: string
) => {
  const url = host + "/api/v1/solicitud/cambiar-estado-dpe/" + id;
  let error = "";
  const formData = new FormData();
  formData.append("status_dpe", status_dpe);
  formData.append("comentario_dpe", comentario_dpe);
  formData.append("tipo_estamento", tipo_estamento);
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

export default changeStatusSolicitud;
