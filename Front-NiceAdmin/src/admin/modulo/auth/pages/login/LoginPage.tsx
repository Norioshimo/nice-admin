import { Footer } from "../../../../components/Footer";

export const LoginPage = () => {
  return (
    <>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <a
                    href="index.html"
                    className="logo d-flex align-items-center w-auto"
                  >
                    <img src="assets/img/logo.png" alt="" />
                    <span className="d-none d-lg-block">NiceAdmin</span>
                  </a>
                </div>

                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h5 className="card-title text-center pb-0 fs-4">
                        LOGIN
                      </h5>
                      <p className="text-center small">
                        Template de AdminNice - Iniciar sesión para continuar
                      </p>
                    </div>

                    <form className="row g-3 needs-validation">
                      <div className="col-12">
                        <label  className="form-label">
                          Usuario
                        </label>
                        <div className="input-group has-validation">
                          
                          <input
                            type="text"
                            name="username"
                            className="form-control"
                            id="yourUsername"
                            required
                            placeholder="Ingrese su usuario"
                          />
                          <div className="invalid-feedback">
                            Please enter your username.
                          </div>
                        </div>
                      </div>

                      <div className="col-12">
                        <label className="form-label">
                          Contraseña
                        </label>
                        <input
                          type="password"
                          name="password"
                          className="form-control"
                          id="yourPassword"
                          placeholder="Ingrese su clave"
                          required
                        />
                        <div className="invalid-feedback">
                          Please enter your password!
                        </div>
                      </div>
 
                      <div className="col-12">
                        <button className="btn btn-primary w-100" type="submit">
                          Login
                        </button>
                      </div>
                      
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer isLogin={true} />
    </>
  );
};
