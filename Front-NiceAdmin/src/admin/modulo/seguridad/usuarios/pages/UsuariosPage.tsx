import { useMemo } from "react";
import PageTitle from "../../../../components/shared/PageTitle";

const UsuariosPage = () => {
  const breadcrumb = useMemo(() => ["Seguridad", "Usuarios"], []);
  return (
    <>
      <PageTitle title="Usuarios" breadcrumbItem={breadcrumb} />
      UsuariosPage
    </>
  );
};

export default UsuariosPage;
