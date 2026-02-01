import { useAuthStore } from "../../store/auth.store";
import { usePerfil } from "../../hooks";
import { Loading } from "../../../../components/utils";
import PerfilForm from "./PerfilForm";
import PageTitle from "../../../../components/shared/PageTitle";
import { useMemo } from "react";

const PerfilPage = () => {
  const breadcrumb = useMemo(() => ["Perfil"], []);

  const { user } = useAuthStore();

  const { data: userPerfil, isPending, mutation } = usePerfil(user!.id);

  if (!userPerfil) return <Loading isPosting={isPending} texto="" />;

  return (
    <>
      <PageTitle title="Perfil" breadcrumbItem={breadcrumb} />

      <PerfilForm userPerfil={userPerfil} mutation={mutation} />
    </>
  );
};

export default PerfilPage;
