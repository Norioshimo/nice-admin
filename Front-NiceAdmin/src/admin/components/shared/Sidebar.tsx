import { NavLink } from "react-router-dom";
import { useAuthStore } from "../../modulo/auth/store/auth.store";

export const Sidebar = () => {
  const { logout } = useAuthStore();

  console.log(`Construir Sidebar`)

  return (
    <>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <NavLink className="nav-link collapsed" to="/">
              <i className="bi bi-house"></i>
              <span>Home</span>
            </NavLink>
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
                <NavLink to={"/seguridad/usuarios"}
                className={({ isActive }) => (isActive ? "active" : "")}>
                  <i className="bi bi-circle"></i>
                  <span>Usuarios</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={"/seguridad/programas"}
                className={({ isActive }) => (isActive ? "active" : "")}>
                  <i className="bi bi-circle"></i>
                  <span>Programas</span>
                </NavLink>
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
                <NavLink to={"/mantenimiento/productos"}
                className={({ isActive }) => (isActive ? "active" : "")}>
                  <i className="bi bi-circle"></i>
                  <span>Productos</span>
                </NavLink>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <NavLink className="nav-link collapsed" to="/auth/login" onClick={logout}>
              <i className="bi bi-box-arrow-right"></i>
              <span>Cerrar Sesión</span>
            </NavLink>
          </li>
        </ul>
      </aside>
    </>
  );
};
