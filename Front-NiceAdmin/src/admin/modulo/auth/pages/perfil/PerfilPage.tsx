import { useAuthStore } from "../../store/auth.store"; 
import { usePerfil } from "../../hooks"; 
import { Loading } from "../../../../components/utils";
import { PageTitle } from "../../../../components/shared";
import PerfilForm from "./PerfilForm";

  const PerfilPage = () => {
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


export default PerfilPage;
