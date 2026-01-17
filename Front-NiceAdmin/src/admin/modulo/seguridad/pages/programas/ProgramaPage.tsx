import { PageTitle } from "../../../../components";
import { ProgramaForm } from "./ProgramaForm";

export const ProgramaPage = () => {
  return (
    <>
      <PageTitle
        title="Programas"
        breadcrumbItem={["Seguridad", "Programas"]}
      />

      <ProgramaForm/>
    </>
  );
};
