import { useCategories } from "@/hooks/categories/useCategories";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

export default function CategoriesScreen() {
  const { data: categories, isLoading } = useCategories();

  if (isLoading) return <Text>Cargando...</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity className="p-4 mb-2 bg-gray-100 rounded-xl">
            <Text className="text-lg font-bold">{item.name}</Text>
            {item.is_seasonal ? (
              <Text className="text-sm text-gray-500">
                {item.start_date} – {item.end_date}
              </Text>
            ) : null}
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
