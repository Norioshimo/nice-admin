import { useCallback, useEffect, useMemo, useState } from "react";
import { PageTitle } from "../../../../components/shared";
import FormLayout from "../../../layouts/FormLayout";
import { useProgramas } from "../hooks/useProgramas";
import type {
  ColumnDef,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import { DataTable } from "../../../../components/DataTable/DataTable";
import { ProgramaFilter } from "./ProgramaFilter";
import { useNavigate } from "react-router";
import { ConfirmAlert } from "../../../../components/alerts";
import { useProgramaDelete } from "../hooks";
import type { Programas, ProgramasFilters } from "../interfaces";
import { Filters } from "../../../../components/DataTable";
import { useDebounce } from "use-debounce";

const ProgramaPage = () => {
  const navigate = useNavigate();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const [filters, setFilters] = useState<ProgramasFilters>({
    nombre: undefined,
    id: undefined,
  });

  const sortParam = useMemo(() => {
    if (!sorting.length) return "id,desc";
    const { id, desc } = sorting[0];
    return `${id},${desc ? "desc" : "asc"}`;
  }, [sorting]);

  // Debounce de 1.5s
  const [debouncedFilters] = useDebounce(filters, 1500);

  const { data, isLoading, refetch } = useProgramas(
    pagination.pageIndex,
    pagination.pageSize,
    sortParam,
    debouncedFilters,
  );

  const { mutation: mutationDelete } = useProgramaDelete();

  const handleEdit = useCallback((id: number) => {
    navigate(`/seguridad/programas/${id}/edit`);
  }, []);

  const handleDelete = useCallback(
    async (id: number) => {
      const confirmed = await ConfirmAlert({
        title: "Eliminar programa",
        text: "El programa será eliminado definitivamente",
      });

      if (!confirmed) return;

      mutationDelete.mutate(id);
    },
    [mutationDelete],
  );

  const handleCreate = useCallback(() => {
    navigate(`/seguridad/programas/new`);
  }, []);

  // Filtrar con el botón de filtros
  const handleFilter = useCallback(() => {
    console.log("Filtrar Programa");

    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
    refetch();
  }, []);

  const getColumns = (
    onEdit: (id: number) => void,
    onDelete: (id: number) => void,
  ): ColumnDef<Programas>[] => [
    { header: "ID", accessorKey: "id" },
    { header: "Nombre", accessorKey: "nombre" },
    {
      id: "acciones",
      header: "Acciones",
      enableSorting: false,
      enableColumnFilter: false,
      size: 85, 
      meta: { fixed: true },
      cell: ({ row }) => (
        <div className="d-flex align-items-center justify-content-center gap-1">
          <button
            className="btn btn-success btn-sm"
            onClick={() => onEdit(row.original.id)}
            title="Editar Registro"
          >
            <i className="bi bi-pen"></i>
          </button>
          <button
            className="btn btn-success btn-sm"
            onClick={() => onDelete(row.original.id)}
            title="Eliminar Registro"
          >
            <i className="bi bi-trash"></i>
          </button>
        </div>
      ),
    },
  ];

  const columns = useMemo(
    () => getColumns(handleEdit, handleDelete),
    [handleEdit, handleDelete],
  );

  const tableData = useMemo(() => data?.data.content ?? [], [data]);

  return (
    <>
      <PageTitle title="Programa" breadcrumbItem={["Seguridad", "Programa"]} />

      <FormLayout
        title="Listado de programas"
        showFilter
        showCreate
        onCreateClick={handleCreate}
      >
        <Filters onFilter={handleFilter}>
          <ProgramaFilter filters={filters} setFilters={setFilters} />
        </Filters>

        <DataTable
          columns={columns}
          data={tableData}
          totalElements={data?.data.totalElements ?? 0}
          pagination={pagination}
          onPaginationChange={setPagination}
          sorting={sorting}
          onSortingChange={setSorting}
          loading={isLoading}
        />
      </FormLayout>
    </>
  );
};

export default ProgramaPage;
