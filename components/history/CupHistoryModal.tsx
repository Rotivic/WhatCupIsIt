// components/CupHistoryModal.tsx
import { useCupHistory } from "@/hooks/history/useCupHistory";
import { useCupHistoryStore } from "@/store/useCupHistoryStore";
import { format } from "date-fns";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";
export default function CupHistoryModal() {
  const {
    showHistoryModal,
    setShowHistoryModal,
    selectedHistoryId,
    setSelectedHistoryId,
  } = useCupHistoryStore();
  const { data: history, isLoading } = useCupHistory();

  return (
    <Modal
      isVisible={showHistoryModal}
      onBackdropPress={() => setShowHistoryModal(false)}
    >
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 12,
          padding: 20,
          maxHeight: "80%",
        }}
      >
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>
          Historial de uso
        </Text>

        {isLoading ? (
          <ActivityIndicator size="large" color="#666" />
        ) : history?.length === 0 ? (
          <Text>No hay registros aún.</Text>
        ) : (
          <FlatList
            data={history}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedHistoryId(item.id)}
                style={{
                  paddingVertical: 10,
                  borderBottomColor: "#ddd",
                  borderBottomWidth: 1,
                }}
              >
                <Text style={{ fontSize: 16 }}>🏺 ID taza: {item.cup_id}</Text>
                <Text style={{ fontSize: 16 }}>
                  Nombre de taza: {item.cupName}
                </Text>
                <Text style={{ color: "#666" }}>
                  Fecha: {format(new Date(item.date), "dd/MM/yyyy")}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </Modal>
  );
}
