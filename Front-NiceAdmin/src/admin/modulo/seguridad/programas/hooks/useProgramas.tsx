import { useQuery } from "@tanstack/react-query";
import { getProgramasAction } from "../actions";
import type { ProgramasFilters } from "../interfaces";

export const useProgramas = (
  pageIndex: number,
  pageSize: number,
  sort: string,
  params: ProgramasFilters = {},
) => {
  const query = useQuery({
    queryKey: ["programas", pageIndex, pageSize, sort, params],
    queryFn: () =>
      getProgramasAction({ pageIndex, pageSize, sort, ...params }),
    retry: false,
    staleTime: 1000 * 60 * 10, // 10 minutos
  });

  return {
    ...query,
  };
};
