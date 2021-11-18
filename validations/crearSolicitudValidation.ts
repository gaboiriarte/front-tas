import { validarRut } from "./validarRut";

export interface Solicitud {
  name_benef?: string;
  rut_benef?: string;
  carrera_benef?: string;
  type_benef?: string;
  anio?: string;
  comentario_funcionario?: string;
  documentacion?: string;
}

export default function crearSolicitudValidation(values: Solicitud) {
  let errores: Solicitud = {};

  //validar el nombre
  if (!values.name_benef) {
    errores.name_benef = "El nombre del alumno es requerido";
  }

  if (!values.rut_benef) {
    errores.rut_benef = "El rut del alumno es requerido";
  } else if (validarRut(values.rut_benef) === false) {
    errores.rut_benef = "El rut del beneficiario es inválido";
  }

  if (!values.carrera_benef) {
    errores.carrera_benef = "La carrera es requerida";
  }

  if (!values.type_benef) {
    errores.type_benef = "El tipo de alumno es requerido";
  }

  if (!values.anio) {
    errores.anio = "El periodo de matricula es requerido";
  }

  if (values.documentacion?.length === 0) {
    errores.documentacion = "Debe adjuntar el comprobante de pago";
  }

  return errores;
}
