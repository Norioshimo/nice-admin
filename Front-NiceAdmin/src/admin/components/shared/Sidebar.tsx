import { Link } from "react-router";
import { useAuthStore } from "../../modulo/auth/store/auth.store";

export const Sidebar = () => {
  const { logout } = useAuthStore();

  return (
    <>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link className="nav-link collapsed" to="/">
              <i className="bi bi-house"></i>
              <span>Home</span>
            </Link>
          </li>

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#components-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bi bi-menu-button-wide"></i>
              <span>Seguridad</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="components-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to={"/seguridad/usuarios"}>
                  <i className="bi bi-circle"></i>
                  <span>Usuarios</span>
                </Link>
              </li>
              <li>
                <Link to={"/seguridad/programas"}>
                  <i className="bi bi-circle"></i>
                  <span>Programas</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <a
              className="nav-link collapsed"
              data-bs-target="#forms-nav"
              data-bs-toggle="collapse"
              href="#"
            >
              <i className="bi bi-journal-text"></i>
              <span>Mantenimiento</span>
              <i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul
              id="forms-nav"
              className="nav-content collapse "
              data-bs-parent="#sidebar-nav"
            >
              <li>
                <Link to={"/mantenimiento/productos"}>
                  <i className="bi bi-circle"></i>
                  <span>Productos</span>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link className="nav-link collapsed" to="/auth/login" onClick={logout}>
              <i className="bi bi-box-arrow-right"></i>
              <span>Cerrar Sesión</span>
            </Link>
          </li>
        </ul>
      </aside>
    </>
  );
};
