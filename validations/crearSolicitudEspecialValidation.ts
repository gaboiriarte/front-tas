import { validarRut } from "./validarRut";

export interface SolicitudEspecial {
  name_benef?: string;
  rut_benef?: string;
  carrera_benef?: string;
  type_benef?: string;
  anio?: string;
  comentario_funcionario?: string;
  documentacion?: string;
  name_funcionario?: string;
  rut_funcionario?: string;
  email_funcionario?: string;
  fono_funcionario?: string;
  tipo_estamento?: string;
  comentario_dpe?: string;
}

export default function crearSolicitudValidationEspecial(
  values: SolicitudEspecial
) {
  let errores: SolicitudEspecial = {};

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
    errores.anio = "El periodo de matrícula es requerido";
  }

  if (values.documentacion?.length === 0) {
    errores.documentacion = "Debe adjuntar el comprobante de pago";
  }

  if (!values.name_funcionario) {
    errores.name_funcionario = "El nombre del funcionario es requerido";
  }

  if (!values.rut_funcionario) {
    errores.rut_funcionario = "El rut del funcionario es requerido";
  } else if (validarRut(values.rut_funcionario) === false) {
    errores.rut_funcionario = "El rut del funcionario es inválido";
  }

  if (!values.email_funcionario) {
    errores.email_funcionario = "El email del funcionario es obligatorio";
  } else if (
    !/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      values.email_funcionario
    )
  ) {
    errores.email_funcionario =
      "El formato de email del funcionario es inválido";
  }

  if (!values.tipo_estamento) {
    errores.tipo_estamento =
      "El tipo de estamento del funcionario es requerido";
  }

  return errores;
}
