import CategoryFormModal from "@/components/categories/CategoryFormModal";
import { useCategories } from "@/hooks/categories/useCategories";
import { Plus } from "lucide-react-native"; // Usa iconos o un emoji si prefieres
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function CategoriesScreen() {
  const { data: categories = [], isLoading } = useCategories();
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);

  if (isLoading) return <Text style={styles.loadingText}>Cargando...</Text>;

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingCategory(null);
    setShowModal(true);
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f9fafb" }}>
      <FlatList
        data={categories}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => handleEdit(item)}
          >
            <Text style={styles.title}>{item.name}</Text>
            {item.is_seasonal ? (
              <Text style={styles.subtitle}>
                {item.start_date} – {item.end_date}
              </Text>
            ) : null}
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay categorías aún.</Text>
        }
      />

      <TouchableOpacity style={styles.fab} onPress={handleCreate}>
        <Plus size={24} color="#fff" />
      </TouchableOpacity>

      <CategoryFormModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        initialData={editingCategory ?? undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingText: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 16,
  },
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },
  subtitle: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    fontSize: 16,
    marginTop: 40,
  },
  fab: {
    position: "absolute",
    right: 24,
    bottom: 24,
    backgroundColor: "#2563eb",
    padding: 16,
    borderRadius: 32,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
});
