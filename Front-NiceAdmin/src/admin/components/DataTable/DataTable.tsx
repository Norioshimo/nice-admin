import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from "@tanstack/react-table";

import { Pagination } from "./Pagination";
import { PageSizeSelect } from "./PageSizeSelect";

interface DataTableProps<T> {
  columns: ColumnDef<T, any>[];
  data: T[];
  totalElements: number;
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  onPaginationChange: (updater: any) => void;

  sorting: SortingState;
  onSortingChange: (updater: any) => void;

  loading?: boolean;
}

export function DataTable<T>({
  columns,
  data,
  totalElements,
  pagination,
  onPaginationChange,
  sorting,
  onSortingChange,
  loading = false,
}: DataTableProps<T>) {
  console.log(`Construir datatable`);
  const table = useReactTable({
    data,
    columns,
    state: {
      pagination,
      sorting,
    },
    manualPagination: true,
    manualSorting: true,
    pageCount: Math.ceil(totalElements / pagination.pageSize),
    onPaginationChange,
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  const { pageIndex, pageSize } = table.getState().pagination;

  const startRow = pageIndex * pageSize + 1;
  const endRow = Math.min(
    startRow + table.getRowModel().rows.length - 1,
    totalElements,
  );

  return (
    <>
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    style={{
                      cursor: header.column.getCanSort()
                        ? "pointer"
                        : "default",
                      width: header.column.columnDef.meta?.fixed
                        ? header.column.getSize()
                        : undefined,
                    }}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                    {{
                      asc: " 🔼",
                      desc: " 🔽",
                    }[header.column.getIsSorted() as string] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  Cargando, por favor espere...
                </td>
              </tr>
            ) : table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center">
                  No se encontraron registros coincidentes
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      style={
                        cell.column.columnDef.meta?.fixed
                          ? { width: cell.column.getSize() }
                          : undefined
                      }
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer responsive */}
      <div
        className="
    d-flex
    flex-column
    flex-md-row
    gap-2
    align-items-center
    justify-content-md-between
    mt-2
  "
      >
        {/* Info + PageSize */}
        <div
          className="
      d-flex
      flex-column
      flex-md-row
      align-items-center
      gap-2
      text-center
    "
        >
          <span className="text-muted small">
            Mostrando {startRow}–{endRow} de {totalElements} registros
          </span>

          <div className="px-2">
            <PageSizeSelect table={table} />
          </div>
        </div>

        {/* Pagination */}
        <div>
          <Pagination<T> table={table} />
        </div>
      </div>
    </>
  );
}
