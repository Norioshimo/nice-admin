import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteProgramaAction } from "../actions"; 

export const useProgramaDelete = () => {
  console.log(`useProgramaDelete`);
  const queryClient = useQueryClient();

  const mutation = useMutation<string, Error, number>({
    mutationFn: (id: number) => deleteProgramaAction(id),
    onSuccess: () => { 
      // Invalidar cache para que la query se vuelva a traer desde el backend
      queryClient.invalidateQueries({ queryKey: ["programas"] });
    },
  });

  return {
    mutation,
  };
};
