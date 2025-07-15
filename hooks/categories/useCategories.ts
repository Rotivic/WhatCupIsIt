import {
  addCategory,
  deleteCategory,
  getAllCategories,
  updateCategory,
} from "@/db/database";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getAllCategories,
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      name,
      is_seasonal = 0,
      start_date,
      end_date,
    }: {
      name: string;
      is_seasonal?: number;
      start_date?: string;
      end_date?: string;
    }) => addCategory(name, is_seasonal, start_date, end_date),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, name, is_seasonal, start_date, end_date }: any) =>
      updateCategory(id, name, is_seasonal, start_date, end_date),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
}
