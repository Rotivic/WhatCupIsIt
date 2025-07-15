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
  const { data: history = [], isLoading } = useCupHistory();

  return (
    <Modal
      isVisible={showHistoryModal}
      onBackdropPress={() => setShowHistoryModal(false)}
      hideModalContentWhileAnimating
      animationIn="zoomIn"
      animationOut="zoomOut"
      backdropOpacity={0.4}
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 16,
          padding: 20,
          maxHeight: "80%",
          width: "90%",
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.2,
          shadowRadius: 6,
          elevation: 6,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "bold", color: "#333" }}>
            🕘 Historial de uso
          </Text>

          <TouchableOpacity onPress={() => setShowHistoryModal(false)}>
            <Text style={{ fontSize: 18, color: "#888" }}>✖️</Text>
          </TouchableOpacity>
        </View>

        {isLoading ? (
          <ActivityIndicator size="large" color="#666" />
        ) : history.length === 0 ? (
          <Text style={{ textAlign: "center", color: "#666" }}>
            No hay registros aún.
          </Text>
        ) : (
          <FlatList
            data={history}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingBottom: 10 }}
            style={{ flexGrow: 1 }}
            ItemSeparatorComponent={() => (
              <View
                style={{
                  height: 1,
                  backgroundColor: "#eee",
                  marginVertical: 8,
                }}
              />
            )}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => setSelectedHistoryId(item.id)}
                style={{
                  paddingVertical: 6,
                }}
              >
                <Text
                  style={{ fontSize: 16, fontWeight: "600", color: "#333" }}
                >
                  🏺 {item.cupName ?? "Taza sin nombre"}
                </Text>
                <Text style={{ fontSize: 14, color: "#666", marginTop: 2 }}>
                  ID: {item.cup_id ?? "-"}
                </Text>
                <Text style={{ fontSize: 14, color: "#999", marginTop: 1 }}>
                  Fecha:{" "}
                  {item.date
                    ? format(new Date(item.date), "dd/MM/yyyy")
                    : "Desconocida"}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </Modal>
  );
}
