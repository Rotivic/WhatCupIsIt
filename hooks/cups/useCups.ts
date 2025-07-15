import { getAllCups } from "@/db/database";
import { useSuspenseQuery } from "@tanstack/react-query";

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
// export function useAddCup() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (cup: { name: string; imageUri: string }) =>
//       addCup(cup.name, cup.imageUri),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["cups"] });
//     },
//   });
// }
