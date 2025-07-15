import {
  addCup,
  deleteCup,
  getAllCups,
  updateCup,
  updateCupFavorite,
} from "@/db/database";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";

// Lista de tazas
export function useCups() {
  return useSuspenseQuery({
    queryKey: ["cups"],
    queryFn: getAllCups,
    staleTime: 1000 * 60 * 5,
    refetchOnMount: true, // <-- fuerza refetch al montar el hook
    refetchOnWindowFocus: false,
  });
}

// Añadir taza
export function useAddCup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      name,
      imageUri,
      category_id,
      is_favorite = 0,
    }: {
      name: string;
      imageUri: string;
      category_id?: number;
      is_favorite?: number;
    }) => addCup({ name, imageUri, category_id, is_favorite }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cups"] });
    },
  });
}

export function useUpdateCup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      name,
      imageUri,
      is_favorite,
    }: {
      id: number;
      name: string;
      imageUri: string;
      is_favorite: number;
    }) => updateCup(id, name, imageUri, is_favorite),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cups"] });
    },
  });
}

export function useDeleteCup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteCup(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cups"] });
    },
  });
}

export function useToggleFavoriteCup() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, is_favorite }: { id: number; is_favorite: number }) =>
      updateCupFavorite(id, is_favorite),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cups"] });
    },
  });
}
