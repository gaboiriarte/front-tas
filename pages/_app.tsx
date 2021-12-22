import "../styles/globals.less"; //importamos css globales y rsuite.
import "../styles/login/login.less";
import type { AppProps } from "next/app";
import * as React from "react";
import { useRouter } from "next/router";
import { AuthProvider } from "../context/AuthConext";
import Head from "next/head"; //head html
import Script from "next/script";
import { CustomProvider } from "rsuite";
import esES from "rsuite/locales/es_ES";
import UseNotification from '../hooks/useNotification';

//falta la importacion del navbar

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  // React.useEffect(() => {
  //   const enviarNotificacion = async () => {
  //     await UseNotification('brsmilanez@gmail.com', 'Prueba de notificacion', 'Esto es una prueba de notificacion');
  //   }
  //   enviarNotificacion();
  // },[]);

  return (
    <>
      <Head>
        <title>Beca hijo de funcionario</title>
        <meta name="description" content="Plataforma DGE" />
        {/* ESTO ES PARA INICIO CON GOOGLE */}
        <meta
          name="google-signin-client_id"
          content="920846582943-uh9c9joa2nqkmk6skvtg46553dcp6490.apps.googleusercontent.com"
        ></meta>
        <script src="https://apis.google.com/js/platform.js" defer></script>
        {/* FIN INICIO CON GOOGLE */}

        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css"
          rel="stylesheet"
        />

        <link
          href="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.6.0/mdb.min.css"
          rel="stylesheet"
        />
      </Head>

      <Script
        type="text/javascript"
        src="https://cdnjs.cloudflare.com/ajax/libs/mdb-ui-kit/3.6.0/mdb.min.js"
      ></Script>

      <CustomProvider locale={esES}>
        <AuthProvider>
          {router.route === "/" ? (
            //en la ruta raiz va el login
            <Component {...pageProps} />
          ) : (
            //incluir navbar (rutas protegidas por el login)

            <Component {...pageProps} />
          )}
        </AuthProvider>
      </CustomProvider>
    </>
  );
}

export default MyApp;
