import { useQuery } from "@tanstack/react-query";
import { getProgramasAction } from "../actions";
import type { ProgramasFilters } from "../interfaces";

export const useProgramas = (
  pageIndex: number,
  pageSize: number,
  sorting: string,
  params: ProgramasFilters = {},
) => {
  const query = useQuery({
    queryKey: ["programas", pageIndex, pageSize, sorting, params],
    queryFn: () =>
      getProgramasAction({ pageIndex, pageSize, sorting, ...params }),
    retry: false,
    staleTime: 1000 * 60 * 10, // 10 minutes
  });

  return {
    ...query,
  };
};
