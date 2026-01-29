import { useQuery } from "@tanstack/react-query";
import { getProgramaAction } from "../actions";

export const usePrograma = (id?: string) => {
  
  const query = useQuery({
    queryKey: ["programa", id],
    queryFn: () => getProgramaAction(id!),
    retry: false,
    staleTime: 1000 * 60 * 1.5, // 1.5 minutes
    enabled: !!id, // Si es true o si existe id se ejecuta el useQuery
  });

  return {
    ...query,
  };
};
 