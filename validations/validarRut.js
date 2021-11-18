const removeSpecialCharacters = (str) => {
  str = str.toLowerCase();
  str = str.replace(/[áàâãäå]/g, "a");
  str = str.replace(/[éèêë]/g, "e");
  str = str.replace(/[íìîï]/g, "i");
  str = str.replace(/[óòôõö]/g, "o");
  str = str.replace(/[úùûü]/g, "u");
  str = str.replace(/[ç]/g, "c");
  str = str.replace(/[ñ]/g, "n");
  str = str.replace(/[^a-z0-9]/g, "_");
  return str;
};

const formatoRut = (rut) => {
  let newRut = rut
    .replace(/[.-]/g, "")
    .replace(/^(\d{1,2})(\d{3})(\d{3})(\w{1})$/, "$1$2$3-$4")
    .replace(".", "");
  return newRut;
};

var Fn = {
  // Valida el rut con su cadena completa "XXXXXXXX-X"
  validaRut: function (rutCompleto) {
    if (!/^[0-9]+[-|‐]{1}[0-9kK]{1}$/.test(rutCompleto)) return false;
    var tmp = rutCompleto.split("-");
    var digv = tmp[1];
    var rut = tmp[0];
    if (digv == "K") digv = "k";
    return Fn.dv(rut) == digv;
  },
  dv: function (T) {
    var M = 0,
      S = 1;
    for (; T; T = Math.floor(T / 10)) S = (S + (T % 10) * (9 - (M++ % 6))) % 11;
    return S ? S - 1 : "k";
  },
};
/**
 * recibe un rut en cualquier formato (con puntos, sin puntos, con guion o sin guion y combinaciones) y lo valida.
 * @param rut: cadena de texto con el rut a validar.
 * @returns {boolean}: true si el rut es valido, false si no lo es.
 * **/
const validarRut = (rut) => {
  let rutValido = false;
  if (rut.length > 0) {
    rutValido = Fn.validaRut(formatoRut(rut));
  }
  return rutValido;
};

export { validarRut, formatoRut, removeSpecialCharacters };
