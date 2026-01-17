import { useMutation, useQuery } from "@tanstack/react-query";
import { getUserPerfilAction } from "../actions/get-user-perfil.action";
import { updatePasswordAction } from "../actions";

export const usePerfil = (id: number) => {
  const query = useQuery({
    queryKey: ["perfil", id], // Controlar por el id de usuario
    queryFn: () => getUserPerfilAction(id),
    enabled: !!id, // si no hay id no se renderiza
    retry: false,
    staleTime: 1000 * 60 * 1.5,
  });

  const mutation = useMutation({
    mutationFn: updatePasswordAction
  });

  return {
    ...query,
    mutation
  };
};
