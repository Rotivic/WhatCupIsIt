// components/forms/CategoryFormModal.tsx
import {
  useCreateCategory,
  useUpdateCategory,
} from "@/hooks/categories/useCategories";
import { useEffect, useState } from "react";
import { Switch, Text, TextInput, View } from "react-native";
import BaseModal from "../ui/BaseModal";

interface Props {
  isVisible: boolean;
  onClose: () => void;
  initialData?: {
    id: number;
    name: string;
    is_seasonal: number;
    start_date?: string;
    end_date?: string;
  };
}

export default function CategoryFormModal({
  isVisible,
  onClose,
  initialData,
}: Props) {
  const isEditing = !!initialData;

  const [name, setName] = useState(initialData?.name ?? "");
  const [isSeasonal, setIsSeasonal] = useState(initialData?.is_seasonal === 1);
  const [startDate, setStartDate] = useState(initialData?.start_date ?? "");
  const [endDate, setEndDate] = useState(initialData?.end_date ?? "");

  const { mutate: createCategory } = useCreateCategory();
  const { mutate: updateCategory } = useUpdateCategory();

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setIsSeasonal(initialData.is_seasonal === 1);
      setStartDate(initialData.start_date ?? "");
      setEndDate(initialData.end_date ?? "");
    } else {
      setName("");
      setIsSeasonal(false);
      setStartDate("");
      setEndDate("");
    }
  }, [initialData, isVisible]);

  const handleSubmit = () => {
    if (!name.trim()) return alert("El nombre es obligatorio");

    if (isEditing && initialData) {
      updateCategory(
        {
          id: initialData.id,
          name,
          is_seasonal: isSeasonal ? 1 : 0,
          start_date: isSeasonal ? startDate : undefined,
          end_date: isSeasonal ? endDate : undefined,
        },
        { onSuccess: onClose }
      );
    } else {
      createCategory(
        {
          name,
          is_seasonal: isSeasonal ? 1 : 0,
          start_date: isSeasonal ? startDate : undefined,
          end_date: isSeasonal ? endDate : undefined,
        },
        { onSuccess: onClose }
      );
    }
  };

  return (
    <BaseModal
      isVisible={isVisible}
      onClose={onClose}
      title={isEditing ? "Editar categoría" : "Nueva categoría"}
      onSubmit={handleSubmit}
    >
      <TextInput
        placeholder="Nombre de la categoría"
        value={name}
        onChangeText={setName}
        className="border border-gray-300 p-3 mb-3 rounded text-base"
      />

      <View className="flex-row items-center mb-3">
        <Switch value={isSeasonal} onValueChange={setIsSeasonal} />
        <Text className="ml-2 text-base">¿Es estacional?</Text>
      </View>

      {isSeasonal && (
        <>
          <TextInput
            placeholder="Fecha inicio (YYYY-MM-DD)"
            value={startDate}
            onChangeText={setStartDate}
            className="border border-gray-300 p-3 mb-3 rounded text-base"
          />
          <TextInput
            placeholder="Fecha fin (YYYY-MM-DD)"
            value={endDate}
            onChangeText={setEndDate}
            className="border border-gray-300 p-3 mb-3 rounded text-base"
          />
        </>
      )}
    </BaseModal>
  );
}
