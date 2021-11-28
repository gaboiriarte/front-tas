import { host } from "../host/host";
const ChangeRol = async (id: string, rol: string) => {
  const url = host + "/api/v1/change-rol/" + id;
  let error = "";
  try {
    const res = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ rol }),
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

export default ChangeRol;
