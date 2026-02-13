import { useNavigate, useParams } from "react-router-dom";
import FormLayout from "../../../layouts/FormLayout";
import { CustomFullScreenLoading } from "../../../../components/utils";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";  
import { usePrograma, useProgramaCreateUpdate } from "../hooks";
import PageTitle from "../../../../components/shared/PageTitle";

const schema = z.object({
  id: z.number().optional(),
  nombre: z.string().min(1, "El nombre es obligatorio"),
});
// Tipo inferido
type FormData = z.infer<typeof schema>;

const ProgramaForm = () => {

  const { id } = useParams();
  const navigate = useNavigate();
  
  const isEdit = !!id;
  const breadcrumb = useMemo(() => ["Seguridad", "Programa", isEdit ? "Editar" : "Nuevo"], []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: "",
    },
  });


  const { data: programa, isFetching } = usePrograma(id);
  const { mutation } = useProgramaCreateUpdate();

  useEffect(() => {
    if (programa) {
      reset({
        id: programa.id,
        nombre: programa.nombre,
      });
    }
  }, [programa, reset]);

  if (isEdit && isFetching) {
    return <CustomFullScreenLoading />;
  }

  const handleCancel = () => {
    console.log(`Cancelar`);
    navigate("/seguridad/programas");
  };

  const onSubmit = async (programa: Partial<FormData>) => {
    console.log(`Guardar`);
    console.log(programa);

    await mutation.mutateAsync(programa, {
      onSuccess: (_) => {
        console.log(`Creado con exito`);
          navigate(`/seguridad/programas`);
      },
      onError: (error) => {
        console.log(error);
        console.log(`error`);
      },
    });
  };

  return (
    <>
      <PageTitle
        title="Programa"
        breadcrumbItem={breadcrumb}
      />
      <FormLayout
        title={isEdit ? "Editar Programa" : "Crear Programa"}
        showCancel={true}
        showSave={true}
        onCancelClick={handleCancel}
        onSaveClick={handleSubmit(onSubmit)}
        isCreating={mutation.isPending}
      >
        <div className="row">
          {isEdit && (
            <div className="col-md-6">
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

          <div className="col-md-6">
            <label htmlFor="nombre" className="form-label">
              Nombre *
            </label>

            <input
              type="text"
              id="nombre"
              maxLength={50}
              className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
              {...register("nombre")}
            />

            {errors.nombre && (
              <div className="invalid-feedback">{errors.nombre.message}</div>
            )}
          </div>
        </div>
      </FormLayout>
    </>
  );
};

export default ProgramaForm;
