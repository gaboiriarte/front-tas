import { host } from "../host/host";
const postSolicitudEspecial = async (
  name_benef: string,
  rut_benef: string,
  carrera_benef: string,
  type_benef: string,
  anio: string,
  comentario_funcionario: string,
  archivos: Array<any>,
  archivos2: Array<any>,
  name_funcionario: string,
  rut_funcionario: string,
  email_funcionario: string,
  fono_funcionario: string,
  tipo_estamento: string,
  comentario_dpe: string
) => {
  const url = host + "/api/v1/solicitud/create-especial";
  let error = "";
  const formData = new FormData();
  formData.append("name_benef", name_benef);
  formData.append("rut_benef", rut_benef);
  formData.append("carrera_benef", carrera_benef);
  formData.append("type_benef", type_benef);
  formData.append("anio", anio);
  formData.append("comentario_funcionario", comentario_funcionario);
  formData.append("name_funcionario", name_funcionario);
  formData.append("rut_funcionario", rut_funcionario);
  formData.append("email_funcionario", email_funcionario);
  formData.append("fono_funcionario", fono_funcionario);
  formData.append("tipo_estamento", tipo_estamento);
  formData.append("comentario_dpe", comentario_dpe);

  archivos.forEach((file) => {
    formData.append("documentacion[]", file.blobFile);
  });
  archivos2.forEach((file) => {
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

export default postSolicitudEspecial;
