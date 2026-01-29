import type { Table } from "@tanstack/react-table";

interface PageSizeSelectProps<T> {
  table: Table<T>;
}

export function PageSizeSelect<T>({ table }: PageSizeSelectProps<T>) {
  return (
    <select
      className="form-select form-select-sm w-auto"
      value={table.getState().pagination.pageSize}
      onChange={(e) => {
        table.setPageSize(Number(e.target.value));
        table.setPageIndex(0);
      }}
    >
      {[10, 25, 50, 100, 500, 1000].map((size) => (
        <option key={size} value={size}>
          {size} filas
        </option>
      ))}
    </select>
  );
}
