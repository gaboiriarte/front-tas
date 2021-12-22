import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    display: "flex",
    backgroundColor: "#fff",
  },
  section: {
    margin: "auto",
    width: "85%",
    height: "75%",
    border: "4px solid #c7702e",
    backgroundColor: "#fcf2ea",
    borderRadius: "15px",
    padding: "15px 18px",
  },
  title: {
    textAlign: "center",
    lineHeight: "1.5",
  },
  paragraph: {
    textAlign: "left",
    lineHeight: "2",
  },
  inicio: {
    marginBottom: "50px",
  },
  principal: {
    marginBottom: "50px",
  },
  containerLogo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "10px",
    width: "100%",
    height: "150px",
  },
  logo: {
    height: "100%",
    width: "150px",
    margin: "auto",
  },
});

const DocuPDF = ({
  nombre,
  rut,
  carrera,
  anio,
  fechaSolicitud,
  numeroSolicitud,
}) => {
  const estudiante = {
    nombre: nombre,
    rut: rut,
    carrera: carrera,
    anio: anio,
    fechaSolicitud: fechaSolicitud,
    numeroSolicitud: numeroSolicitud,
  };
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <View style={styles.containerLogo}>
            <Image
              style={styles.logo}
              src="/Escudo-UCN-Full-Color.png"
              alt=""
            />
          </View>
          <View style={styles.inicio}>
            <Text style={styles.title}>UNIVERSIDAD CATÓLICA DEL NORTE</Text>
            <Text style={styles.title}>DIRECCIÓN GENERAL ESTUDIANTIL</Text>
            <Text style={styles.title}>ANTOFAGASTA</Text>
          </View>

          <View style={styles.principal}>
            <Text style={styles.paragraph}>
              Se aprueba a don(a): {estudiante.nombre}, con el R.U.T{" "}
              {estudiante.rut}, de la carrera de {estudiante.carrera}. La
              asignación de la Beca Hijo de Funcionario para el año{" "}
              {estudiante.anio}, al ser verificado por la Dirección de Personas,
              Dirección de Finanzas y la Dirección General Estudiantil.
            </Text>
          </View>
          <View>
            <Text style={styles.paragraph}>
              Fecha de solicitud: {estudiante.fechaSolicitud}
            </Text>
            <Text style={styles.paragraph}>
              Número de solicitud: {estudiante.numeroSolicitud}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default DocuPDF;
