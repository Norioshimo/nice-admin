import { useQuery } from "@tanstack/react-query";
import type { RolesFilters } from "../interfaces";
import { getRolesAction } from "../actions";

interface Options {
  page: number;
  size: number;
  sort: string;
  params?: RolesFilters;
  path?: string;
}

export const useRoles = ({
  page = 0,
  size = 10,
  sort,
  params = {},
}: Options) => {
  const query = useQuery({
    queryKey: ["roles", page, size, sort, params],
    queryFn: () => getRolesAction({ page, size, sort, ...params }),
    retry: false,
    staleTime: 1000 * 60 * 10, // 10 minutos
  });

  return {
    ...query,
  };
};
