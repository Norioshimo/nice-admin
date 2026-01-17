import { useAuthStore } from "../../store/auth.store";
import { Loading, PageTitle } from "../../../../components";
import { usePerfil } from "../../hooks";
import { PerfilForm } from "./PerfilForm";

export const PerfilPage = () => {
  const { user } = useAuthStore();

  const { data: userPerfil, isPending, mutation } = usePerfil(user!.id);

  if (!userPerfil) return <Loading isPosting={isPending} texto="" />;

  return (
    <>
      <PageTitle title="Perfil" breadcrumbItem={["Perfil"]} />
      
      <PerfilForm userPerfil={userPerfil} mutation={mutation} />
    </>
  );
};
