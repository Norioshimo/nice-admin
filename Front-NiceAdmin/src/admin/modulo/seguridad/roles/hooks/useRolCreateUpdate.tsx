import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUpdateRolAction } from "../actions";
import type { Roles } from "../interfaces";

export const useRolCreateUpdate = () => {
  console.log(`useProgramaCreateUpdate`);
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createUpdateRolAction,
    onSuccess: (rol: Roles) => {
      console.log(`exito`)
      console.log(rol)
      // Invalidar caché
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      queryClient.invalidateQueries({
        queryKey: ["rol", rol.id.toString()],
      });

      // Actualizar queryData
      queryClient.setQueryData(["rol", rol.id.toString()], rol);
    },
  });

  return {
    mutation,
  };
};
