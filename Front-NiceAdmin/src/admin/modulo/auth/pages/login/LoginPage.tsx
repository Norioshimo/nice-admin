import { useState, type FormEvent } from "react";
import { Footer } from "../../../../components/shared/Footer";
import { Loading } from "../../../../components";
import { useAuthStore } from "../../store/auth.store";
import Swal from "sweetalert2"; 

export const LoginPage = () => {
  const { login } = useAuthStore();

  const [isPosting, setIsPosting] = useState(false);

  const handleLogin = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(`Enviar datos al backend`);

    setIsPosting(true);

    const formData = new FormData(event.target as HTMLFormElement);
    const usuario = formData.get("usuario") as string;
    const clave = formData.get("clave") as string;
 

    const returnData = await login(usuario, clave); 

    if (returnData.get("valido")) {
      Swal.fire({
        text: returnData.get("message"),
        icon: "success",
        confirmButtonText: "OK",
      });
    } else {
      if (returnData.get("message") != undefined) {
        Swal.fire("Error de autenticación", returnData.get("message"), "error");
      }
    }

    setIsPosting(false);
  };

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
                        Template de AdminNice <br /> Iniciar sesión para
                        continuar
                      </p>
                    </div>

                    <form
                      className="row g-3 needs-validation"
                      onSubmit={handleLogin}
                    >
                      <div className="col-12">
                        <label className="form-label">Usuario</label>
                        <div className="input-group has-validation">
                          <input
                            type="text"
                            name="usuario"
                            className="form-control"
                            required
                            placeholder="Ingrese su usuario"
                          /> 
                        </div>
                      </div>

                      <div className="col-12">
                        <label className="form-label">Contraseña</label>
                        <input
                          type="password"
                          name="clave"
                          className="form-control"
                          placeholder="Ingrese su clave"
                          required
                        /> 
                      </div>

                      <div className="col-12">
                        <button
                          className="btn btn-primary w-100"
                          type="submit"
                          disabled={isPosting}
                        >
                          <Loading isPosting={isPosting} texto={"Login"} />
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
