import { useQuery } from "@tanstack/react-query";
import { getRolAction } from "../actions";

export const useRol = (id?: string) => {
  
  const query = useQuery({
    queryKey: ["rol", id],
    queryFn: () => getRolAction(id!),
    retry: false,
    staleTime: 1000 * 60 * 1.5, // 1.5 minutes
    enabled: !!id, // Si es true o si existe id se ejecuta el useQuery
  });

  return {
    ...query,
  };
};
 