import { useForm } from "react-hook-form";
import type { UseMutationResult } from "@tanstack/react-query";
import Swal from "sweetalert2";

import type { PerfilResponse } from "../../interfaces";
import type { UpdatePasswordInput } from "../../actions";
import { Loading } from "../../../../components/utils";

export interface ChangePasswordForm {
  clave: string;
  reclave: string;
}

interface Props {
  userPerfil: PerfilResponse;
  mutation: UseMutationResult<any, Error, UpdatePasswordInput, unknown>;

  // Methods
}

const PerfilForm = ({ userPerfil, mutation }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ChangePasswordForm>({
    defaultValues: { clave: "", reclave: "" },
  });

  const onSubmit = async (dataPass: ChangePasswordForm) => {
    console.log("handleSubmit:", dataPass);
    try {
      const resp = await mutation.mutateAsync({
        id: userPerfil!.id,
        clave: dataPass.clave,
      });
      console.log("Respuesta actualización clave:", resp);

      Swal.fire({
        icon: "success",
        title: "Éxito",
        text: resp.message,
      });
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error?.response?.data?.message,
      });
    } finally {
      reset();
    }
  };

  return (
    <>
      <section className="section profile">
        <div className="row">
          <div className="col-xl-12">
            <div className="card">
              <div className="card-body pt-3">
                <ul className="nav nav-tabs nav-tabs-bordered">
                  <li className="nav-item">
                    <button
                      className="nav-link active"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-edit"
                    >
                      Profile
                    </button>
                  </li>

                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-change-password"
                    >
                      Cambiar Clave
                    </button>
                  </li>
                </ul>

                <div className="tab-content pt-2">
                  <div
                    className="tab-pane fade show active pt-3"
                    id="profile-edit"
                  >
                    <div className="row mb-3">
                      <label
                        htmlFor="rol"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Rol
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          id="rol"
                          type="text"
                          className="form-control"
                          disabled
                          readOnly
                          value={userPerfil.nombreRol}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="nombre"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Nombre Completo
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          id="nombre"
                          type="text"
                          className="form-control"
                          readOnly
                          disabled
                          value={userPerfil.nombre}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="usuario"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Usuario
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          id="usuario"
                          type="text"
                          className="form-control"
                          disabled
                          readOnly
                          value={userPerfil.usuario}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="email"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Email
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          id="email"
                          type="email"
                          className="form-control"
                          disabled
                          readOnly
                          value={userPerfil.email}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className="tab-pane fade pt-3"
                    id="profile-change-password"
                  >
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                      <div className="row mb-3">
                        <label
                          htmlFor="clave"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Clave *
                        </label>

                        <div className="col-md-8 col-lg-9">
                          <input
                            id="clave"
                            type="password"
                            placeholder="Ingrese su clave"
                            className={`form-control ${
                              errors.clave ? "is-invalid" : ""
                            }`}
                            {...register("clave", {
                              required: "La clave es obligatoria",
                            })}
                          />

                          {errors.clave && (
                            <div className="invalid-feedback">
                              {errors.clave.message}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="row mb-3">
                        <label
                          htmlFor="reclave"
                          className="col-md-4 col-lg-3 col-form-label"
                        >
                          Repita su clave *
                        </label>

                        <div className="col-md-8 col-lg-9">
                          <input
                            id="reclave"
                            type="password"
                            placeholder="Repita su clave"
                            className={`form-control ${
                              errors.reclave ? "is-invalid" : ""
                            }`}
                            {...register("reclave", {
                              required: "Debe repetir su clave",
                              validate: (value) =>
                                value === watch("clave") ||
                                "Las claves no coinciden",
                            })}
                          />

                          {errors.reclave && (
                            <div className="invalid-feedback">
                              {errors.reclave.message}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="text-center">
                        <button
                          type="submit"
                          className="btn btn-success btn-sm"
                          disabled={isSubmitting}
                        >
                          <Loading
                            isPosting={mutation.isPending}
                            texto="Actualizar Clave"
                          />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PerfilForm;
