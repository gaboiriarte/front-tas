import { host } from "../host/host";
const changeStatusSolicitudCobranza = async (
  id: string,
  status_dpe: string,
  comentario_dpe: string,
  estado_curricular: string
) => {
  const url = host + "/api/v1/solicitud/cambiar-estado-cobranza/" + id;
  let error = "";
  const formData = new FormData();
  formData.append("status_cobranza", status_dpe);
  formData.append("comentario_cobranza", comentario_dpe);
  formData.append("estado_curricular", estado_curricular);
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

export default changeStatusSolicitudCobranza;
