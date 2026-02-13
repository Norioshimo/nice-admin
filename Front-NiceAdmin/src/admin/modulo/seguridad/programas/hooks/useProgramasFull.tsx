import { useQuery } from "@tanstack/react-query";
import { getProgramasFullAction } from "../actions";

export const useProgramasFull = () => {
  const query = useQuery({
    queryKey: ["programas"],
    queryFn: () => getProgramasFullAction(),
    retry: false,
    staleTime: 1000 * 60 * 10, // 10 minutos
  });

  return {
    ...query,
  };
};
