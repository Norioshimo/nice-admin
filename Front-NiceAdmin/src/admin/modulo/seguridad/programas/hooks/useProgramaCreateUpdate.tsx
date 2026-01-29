import { useMutation,  useQueryClient } from "@tanstack/react-query";
import { createUpdateProgramaAction } from "../actions";
import type { Programas } from "../interfaces";


export const useProgramaCreateUpdate = () => {
  console.log(`useProgramaCreateUpdate`)
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createUpdateProgramaAction,
    onSuccess: (programa: Programas) => {
      // Invalidar caché
      queryClient.invalidateQueries({ queryKey: ["programas"] });
      queryClient.invalidateQueries({
        queryKey: ["programa", { id: programa.id }],
      });

      // Actualizar queryData
      queryClient.setQueryData(["programa", { id: programa.id }], programa);
    },
  });

  return {
    mutation,
  };
}; 
