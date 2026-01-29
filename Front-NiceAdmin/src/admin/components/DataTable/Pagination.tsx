import type { Table } from "@tanstack/react-table";

interface PaginationProps<T> {
  table: Table<T>;
}

export function Pagination<T>({ table }: PaginationProps<T>) {
  const { pageIndex } = table.getState().pagination;
  const pageCount = table.getPageCount();

  if (pageCount <= 1) return null;

  const maxPagesToShow = 3;

  const start = Math.max(
    0,
    pageIndex - Math.floor(maxPagesToShow / 2),
  );

  const end = Math.min(pageCount, start + maxPagesToShow);

  const pages = Array.from(
    { length: end - start },
    (_, i) => start + i,
  );

  return (
    <nav aria-label="Page navigation">
      <ul className="pagination pagination-sm justify-content-center mb-0">

        {/* Primera página - solo desktop */}
        <li className={`page-item d-none d-md-block ${pageIndex === 0 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => table.setPageIndex(0)}
            disabled={pageIndex === 0}
          >
            ««
          </button>
        </li>

        {/* Página anterior */}
        <li className={`page-item ${!table.getCanPreviousPage() ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            «
          </button>
        </li>

        {/* Números */}
        {pages.map((page) => {
          const active = pageIndex === page;

          return (
            <li
              key={page}
              className={`page-item ${active ? "active" : ""}`}
              aria-current={active ? "page" : undefined}
            >
              <button
                className="page-link"
                onClick={() => table.setPageIndex(page)}
              >
                {page + 1}
              </button>
            </li>
          );
        })}

        {/* Página siguiente */}
        <li className={`page-item ${!table.getCanNextPage() ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            »
          </button>
        </li>

        {/* Última página - solo desktop */}
        <li className={`page-item d-none d-md-block ${pageIndex === pageCount - 1 ? "disabled" : ""}`}>
          <button
            className="page-link"
            onClick={() => table.setPageIndex(pageCount - 1)}
            disabled={pageIndex === pageCount - 1}
          >
            »»
          </button>
        </li>

      </ul>
    </nav>
  );
}
