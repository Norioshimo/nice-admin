import { useQuery } from "@tanstack/react-query";
import { getProgramasAction } from "../actions";
import type { ProgramasFilters } from "../interfaces";

interface Options {
  page?: number;
  size?: number;
  sort?: string;
  params?: ProgramasFilters;
}

export const useProgramas = ({
  page = 0,
  size = 10,
  sort,
  params = {},
}: Options) => {
  const query = useQuery({
    queryKey: ["programas", page, size, sort, params],
    queryFn: () => getProgramasAction({ page, size, sort, ...params }),
    retry: false,
    staleTime: 1000 * 60 * 10, // 10 minutos
  });

  return {
    ...query,
  };
};
