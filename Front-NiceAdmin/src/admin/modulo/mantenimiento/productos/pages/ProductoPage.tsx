import { useMemo } from "react";
import PageTitle from "../../../../components/shared/PageTitle";

const ProductoPage = () => {
  const breadcrumb = useMemo(() => ["Mantenimiento", "Productos"], []);
  return (
    <>
      <PageTitle title="Productos" breadcrumbItem={breadcrumb} />
      ProductoPage
    </>
  );
};

export default ProductoPage;
