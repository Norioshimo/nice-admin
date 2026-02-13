import { useCallback, useMemo, useState } from "react";
import PageTitle from "../../../../components/shared/PageTitle";
import FormLayout from "../../../layouts/FormLayout";
import { useNavigate } from "react-router-dom";
import { DataTable, Filters } from "../../../../components/DataTable";
import type {
  ColumnDef,
  PaginationState,
  SortingState,
} from "@tanstack/react-table";
import type { Roles, RolesFilters } from "../interfaces";
import { useRolDelete, useRoles } from "../hooks";
import { ConfirmAlert } from "../../../../components/alerts";
import { RolFilter } from "./RolFilter";

const RolPage = () => {
  const navigate = useNavigate();

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = useState<SortingState>([]);

  const [filters, setFilters] = useState<RolesFilters>({
    nombre: undefined,
    id: undefined,
  });

  const [appliedFilters, setAppliedFilters] = useState<RolesFilters>(filters);

  const sortParam = useMemo(() => {
    if (!sorting.length) return "id,desc";
    const { id, desc } = sorting[0];
    return `${id},${desc ? "desc" : "asc"}`;
  }, [sorting]);

  const { data, isFetching } = useRoles({
    page: pagination.pageIndex,
    size: pagination.pageSize,
    sort: sortParam,
    params: appliedFilters,
  });

  const { mutation: mutationDelete } = useRolDelete();

  const handleEdit = useCallback((id: number) => {
    navigate(`/seguridad/roles/${id}/edit`);
  }, []);

  const handleDelete = useCallback(
    async (id: number) => {
      const confirmed = await ConfirmAlert({
        title: "Eliminar Rol",
        text: "El rol será eliminado definitivamente",
      });

      if (!confirmed) return;

      mutationDelete.mutate(id);
    },
    [mutationDelete],
  );

  const handleCreate = useCallback(() => {
    navigate(`/seguridad/roles/new`);
  }, []);

  // Filtrar con el botón de filtros
  const handleFilter = useCallback(() => {
    console.log("Filtrar Roles");
    setAppliedFilters(filters);

    setPagination((prev) => ({ ...prev, pageIndex: 0 }));
  }, [filters]);

  const getColumns = (
    onEdit: (id: number) => void,
    onDelete: (id: number) => void,
  ): ColumnDef<Roles>[] => [
    { header: "ID", accessorKey: "id" },
    { header: "Nombre", accessorKey: "nombre" },
    {
      header: "Estado",
      accessorKey: "estado",
      size: 120,
      meta: { fixed: true },
      cell: ({ row }) => (
        <span
          className={
            row.original.estado ? "badge bg-success" : "badge bg-danger"
          }
        >
          {row.original.estado ? "Activo" : "Inactivo"}
        </span>
      ),
    },
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
  const breadcrumb = useMemo(() => ["Seguridad", "Rol"], []);

  return (
    <>
      <PageTitle title="Rol" breadcrumbItem={breadcrumb} />

      <FormLayout
        title="Listado de roles"
        showFilter
        showCreate
        onCreateClick={handleCreate}
      >
        <Filters onFilter={handleFilter} showFilterBotton={true}>
          <RolFilter filters={filters} setFilters={setFilters} />
        </Filters>

        <DataTable
          columns={columns}
          data={tableData}
          totalElements={data?.data.totalElements ?? 0}
          pagination={pagination}
          onPaginationChange={setPagination}
          sorting={sorting}
          onSortingChange={setSorting}
          loading={isFetching}
        />
      </FormLayout>
    </>
  );
};

export default RolPage;
