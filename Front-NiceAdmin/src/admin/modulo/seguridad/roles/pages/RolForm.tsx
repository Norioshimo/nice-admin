import { useNavigate, useParams } from "react-router-dom";
import PageTitle from "../../../../components/shared/PageTitle";
import { useEffect, useMemo } from "react";
import FormLayout from "../../../layouts/FormLayout";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CustomFullScreenLoading } from "../../../../components/utils";
import { useRol, useRolCreateUpdate } from "../hooks";
import { useProgramasFull } from "../../programas/hooks";

const schema = z.object({
  id: z.number().optional(),
  nombre: z.string().min(1, "El nombre es obligatorio"),
  descripcion: z.string().max(2000),
  estado: z
    .boolean()
    .refine((v) => v === true || v === false, "El estado es obligatorio"),
  rolprogramaList: z.array(
    z.object({
      id: z.number().optional(),
      programaId: z.number(),
      canCreate: z.boolean(),
      canUpdate: z.boolean(),
      canDelete: z.boolean(),
    }),
  ),
});

// Tipo inferido
type FormData = z.infer<typeof schema>;

const RolForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const isEdit = !!id;
  const breadcrumb = useMemo(
    () => ["Seguridad", "Rol", isEdit ? "Editar" : "Nuevo"],
    [],
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: "",
      descripcion: "",
      estado: false,
      rolprogramaList: [],
    },
  });

  const { data: rol, isFetching } = useRol(id);
  const { mutation } = useRolCreateUpdate();

  const { data: programas } = useProgramasFull();

  useEffect(() => {
    if (!programas) return;

    const base = programas.map((p: any) => {
      const existing = rol?.rolprogramaList?.find(
        (rp: any) => rp.programaId === p.id,
      );

      return {
        id: existing?.id ?? undefined,
        programaId: p.id,
        canCreate: existing?.canCreate ?? false,
        canUpdate: existing?.canUpdate ?? false,
        canDelete: existing?.canDelete ?? false,
      };
    });

    console.log("datos de base");
    console.log(base);

    reset({
      id: rol?.id,
      nombre: rol?.nombre ?? "",
      descripcion: rol?.descripcion ?? "",
      estado: rol?.estado ?? false,
      rolprogramaList: base,
    });
  }, [programas, rol, reset]);

  if (isEdit && isFetching) {
    return <CustomFullScreenLoading />;
  }

  const handleCancel = () => {
    console.log(`Cancelar`);
    navigate("/seguridad/roles");
  };

  const onError = (errors: any) => {
    console.log("Errores de validación:", errors);
  };

  const onSubmit = async (rol: Partial<FormData>) => {
    console.log(`Guardar`);
    console.log(rol);

    await mutation.mutateAsync(rol, {
      onSuccess: (_) => {
        console.log(rol);
        console.log(`Creado con exito`);
        navigate(`/seguridad/roles`);
      },
      onError: (error) => {
        console.log(error);
        console.log(`error`);
      },
    });
  };

  return (
    <>
      <PageTitle title="Rol" breadcrumbItem={breadcrumb} />

      <FormLayout
        title={isEdit ? "Editar Rol" : "Crear Rol"}
        showCancel={true}
        showSave={true}
        onCancelClick={handleCancel}
        onSaveClick={handleSubmit(onSubmit, onError)}
        isCreating={mutation.isPending}
        classContainer={true}
      >
        <div className="row g-3">
          {/* CARD DATOS DEL ROL */}
          <div className="col-md-4">
            <div className="card shadow-none border">
              <div className="card-header bg-transparent fw-semibold">
                Datos del Rol
              </div>
              <div className="card-body">
                {isEdit && (
                  <div className="mb-3">
                    <label htmlFor="id" className="form-label">
                      ID
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="id"
                      disabled={true}
                      {...register("id")}
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label">Nombre *</label>
                  <input
                    maxLength={50}
                    className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
                    {...register("nombre")}
                  />
                  {errors.nombre && (
                    <div className="invalid-feedback">
                      {errors.nombre.message}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Descripción</label>
                  <textarea
                    rows={3}
                    maxLength={50}
                    className={`form-control ${errors.descripcion ? "is-invalid" : ""}`}
                    {...register("descripcion")}
                  />
                </div>

                <div className="form-check form-switch">
                  <input
                    className={`form-check-input ${errors.descripcion ? "is-invalid" : ""}`}
                    type="checkbox"
                    {...register("estado")}
                  />
                  <label className="form-check-label">Activo</label>
                </div>
              </div>
            </div>
          </div>

          {/* CARD PROGRAMAS / PERMISOS */}
          <div className="col-md-8">
            <div className="card shadow-none border">
              <div className="card-header bg-transparent fw-semibold">
                Programas / Permisos
              </div>
              <div className="card-body">
                <div className="row pt-3">
                  <div className="col-md-12">
                    {programas?.map((programa: any, index: number) => (
                      <div
                        key={programa.id}
                        className="row border-bottom py-2 align-items-center"
                      >
                        <div className="col-md-4 fw-semibold">
                          {programa.nombre}
                        </div>

                        <div className="col-md-2 form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            style={{ cursor: "pointer" }}
                            {...register(`rolprogramaList.${index}.canCreate`)}
                            id={`canCreate-${index}`}
                          />
                          <label
                            className="form-check-label"
                            style={{ cursor: "pointer" }}
                            htmlFor={`canCreate-${index}`}
                          >
                            Crear
                          </label>
                        </div>

                        <div className="col-md-2 form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            style={{ cursor: "pointer" }}
                            {...register(`rolprogramaList.${index}.canUpdate`)}
                            id={`canUpdate-${index}`}
                          />
                          <label
                            className="form-check-label"
                            style={{ cursor: "pointer" }}
                            htmlFor={`canUpdate-${index}`}
                          >
                            Editar
                          </label>
                        </div>

                        <div className="col-md-2 form-check">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            style={{ cursor: "pointer" }}
                            {...register(`rolprogramaList.${index}.canDelete`)}
                            id={`canDelete-${index}`}
                          />
                          <label
                            className="form-check-label"
                            style={{ cursor: "pointer" }}
                            htmlFor={`canDelete-${index}`}
                          >
                            Eliminar
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </FormLayout>
    </>
  );
};

export default RolForm;
