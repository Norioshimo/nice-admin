import { useQuery } from "@tanstack/react-query"; 
import { getProgramasAction } from "../actions";

export const useProgramas = (
  pageIndex: number,
  pageSize: number,
  sorting: string,
) => {
  
  const query = useQuery({
    queryKey: ["programas", pageIndex, pageSize, sorting],
    queryFn: () => getProgramasAction(pageIndex, pageSize, sorting),
    retry: false,
    staleTime: 1000 * 60 * 1.5, // 1.5 minutes
  });

  return {
    ...query,
  };
};
