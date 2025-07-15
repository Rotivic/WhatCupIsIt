import { useCups } from "@/hooks/cups/useCups";
import { Cup } from "@/types/Cups";
import { Plus } from "lucide-react-native"; // si usas `lucide-react-native`, o cambia por un emoji/icono
import { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import CupCard from "./CupCard";
import CupFormModal from "./CupFormModal";

export default function CupsList() {
  const { data: cups = [] } = useCups();
  const [showModal, setShowModal] = useState(false);
  const [editingCup, setEditingCup] = useState<Cup | null>(null);

  const handleEdit = (cup: Cup) => {
    setEditingCup(cup);
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingCup(null);
    setShowModal(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={cups}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CupCard cup={item} onPress={() => handleEdit(item)} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: 80,
        }}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No hay tazas aún.</Text>
        }
      />

      <TouchableOpacity style={styles.fab} onPress={handleCreate}>
        <Plus color="#fff" size={24} />
      </TouchableOpacity>

      <CupFormModal
        isVisible={showModal}
        onClose={() => setShowModal(false)}
        defaultValues={editingCup ?? undefined}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 24,
    right: 24,
    backgroundColor: "#2563eb",
    borderRadius: 32,
    padding: 16,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    marginTop: 40,
  },
});
