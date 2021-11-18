import React from "react";
import { Toggle, Sidenav, Nav, Dropdown } from "rsuite";
import Link from "next/link";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faColumns, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Logout from "../../hooks/useLogout";

const SideNav = ({ children }: any) => {
  const [expanded, setExpanded] = React.useState(false);
  const [activeKey, setActiveKey] = React.useState("1");
  const router = useRouter();

  const cerrarSesion = async () => {
    const peticion = await Logout();
    console.log(peticion);
    if (peticion.mensaje) {
      router.push({ pathname: "/", query: { logout: "ok" } });
      return;
    }
  };

  function handleToggle() {
    setExpanded(!expanded);
  }

  function handleSelect(e: any) {
    setActiveKey(e);
  }
  return (
    <>
      <div className={"sidenav__intranet"}>
        <Sidenav
          className="sidenav__color"
          style={{
            height: "100vh",
            width: expanded ? "250px" : "55px",
            transitionDuration: "0.5s",
            transitionProperty: "width",
            overflowX: "hidden",
          }}
          expanded={expanded}
          defaultOpenKeys={["3", "4"]}
          activeKey={activeKey}
          onSelect={handleSelect}
        >
          <Toggle onChange={handleToggle} checked={expanded} />
          <Sidenav.Body>
            <Nav>
              <Link passHref href="/">
                <Nav.Item
                  className="sidenav__color"
                  eventKey="1"
                  icon={
                    <FontAwesomeIcon
                      icon={faColumns}
                      className="rs-icon"
                      size="1x"
                    />
                  }
                >
                  Panel Principal
                </Nav.Item>
              </Link>
              {/* <Link passHref href="/intranet/noticias">
                <Nav.Item eventKey="2" icon={<IconButton icon="newspaper-o" />}>
                  Gestión de noticias
                </Nav.Item>
              </Link>
              <Link passHref href="/intranet/eventos">
                <Nav.Item eventKey="3" icon={<IconButton icon="calendar-o" />}>
                  Gestión de eventos
                </Nav.Item>
              </Link>
              <Link passHref href="/intranet/anuncios">
                <Nav.Item eventKey="4" icon={<IconButton icon="speaker" />}>
                  Crear Anuncio
                </Nav.Item>
              </Link> */}

              <Nav.Item
                onClick={cerrarSesion}
                className="sidenav__color"
                eventKey="3"
                icon={
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="rs-icon"
                    size="1x"
                  />
                }
              >
                Cerrar Sesión
              </Nav.Item>
            </Nav>
          </Sidenav.Body>
        </Sidenav>
      </div>
      <main style={{ marginLeft: "65px" }}>{children}</main>
    </>
  );
};

export default SideNav;
