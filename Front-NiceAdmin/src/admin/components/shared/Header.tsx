import { useState } from "react";
import { Link } from "react-router";
import { useAuthStore } from "../../modulo/auth/store/auth.store";

export const Header = () => {
  const { logout, user } = useAuthStore();

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
    document.body.classList.toggle("toggle-sidebar", !toggle);
  };

  return (
    <>
      <header
        id="header"
        className="header fixed-top d-flex align-items-center"
      >
        <div className="d-flex align-items-center justify-content-between">
          <a href="index.html" className="logo d-flex align-items-center">
            <img src="assets/img/logo.png" alt="" />
            <span className="d-none d-lg-block">NiceAdmin</span>
          </a>
          <i
            className="bi bi-justify toggle-sidebar-btn"
            onClick={() => {
              handleToggle();
            }}
          />
        </div>

        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item dropdown pe-3">
              <a
                className="nav-link nav-profile d-flex align-items-center pe-0"
                href="#"
                data-bs-toggle="dropdown"
              >
                <i className="bi bi-person-fill"></i>
                <span className="d-none d-md-block dropdown-toggle ps-2">
                  {user?.usuario}
                </span>
              </a>

              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>{user?.nombre}</h6>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link
                    to={"seguridad/perfil"}
                    className="dropdown-item d-flex align-items-center"
                  >
                    <i className="bi bi-person"></i>
                    <span>Mi Perfil</span>
                  </Link>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>

                <li>
                  <Link
                    className="dropdown-item d-flex align-items-center"
                    to={"/auth/login"}
                    onClick={logout}
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Cerrar Sesión</span>
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
