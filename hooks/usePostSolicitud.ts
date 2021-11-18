import { host } from "../host/host";
const postSolicitud = async (
  name_benef: string,
  rut_benef: string,
  carrera_benef: string,
  type_benef: string,
  anio: string,
  comentario_funcionario: string,
  archivos: Array<any>,
  user_id: string
) => {
  const url = host + "/api/v1/solicitud/create";
  let error = "";
  const formData = new FormData();
  formData.append("name_benef", name_benef);
  formData.append("rut_benef", rut_benef);
  formData.append("carrera_benef", carrera_benef);
  formData.append("type_benef", type_benef);
  formData.append("anio", anio);
  formData.append("user_id", user_id);
  formData.append("comentario_funcionario", comentario_funcionario);

  archivos.forEach((file) => {
    formData.append("documentacion[]", file.blobFile);
  });

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

export default postSolicitud;
