import { host } from "../host/host";
const getUsers = async (page: number) => {
  const url = host + "/api/v1/all-users" + "?page=" + page;
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

export default getUsers;
