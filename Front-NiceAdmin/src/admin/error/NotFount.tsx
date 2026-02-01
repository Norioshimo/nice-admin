import { NavLink } from "react-router-dom";

 
const NotFount = () => {
  return (
    <>
      <div className="container">
        <section className="section error-404 min-vh-100 d-flex flex-column align-items-center justify-content-center">
          <h1>404</h1>
          <h2>The page you are looking for doesn't exist.</h2>

          <NavLink to={"/"}>
            <button type="button" className="btn btn-primary">
              Volver a inicio
            </button>
          </NavLink>
        </section>
      </div>
    </>
  );
};

export default NotFount;
