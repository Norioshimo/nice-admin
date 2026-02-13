import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRolAction } from "../actions";
 

export const useRolDelete = () => {
  console.log(`useRolDelete`);
  const queryClient = useQueryClient();

  const mutation = useMutation<string, Error, number>({
    mutationFn: (id: number) => deleteRolAction(id),
    onSuccess: () => { 
      // Invalidar cache para que la query se vuelva a traer desde el backend
      queryClient.invalidateQueries({ queryKey: ["roles"] });
    },
  });

  return {
    mutation,
  };
};
