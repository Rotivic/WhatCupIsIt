// components/CupRouletteModal.tsx
import { getNextCupForToday } from "@/helpers/selectRandomCup";
import { useCupHistoryStore } from "@/store/useCupHistoryStore";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Modal from "react-native-modal";

export default function CupRouletteModal() {
  const { isAdding, setIsAdding, showRouletteModal, setShowRouletteModal } =
    useCupHistoryStore();
  const [loading, setLoading] = useState(true);
  const [cup, setCup] = useState<any | null>(null);
  const queryClient = useQueryClient();
  useEffect(() => {
    if (showRouletteModal) {
      setLoading(true);
      getNextCupForToday().then((selected) => {
        setCup(selected);
        setLoading(false);

        // ✅ Invalidamos la query tras registrar la taza
        queryClient.invalidateQueries({ queryKey: ["cup-usage-history"] });
      });
    }
  }, [showRouletteModal]);

  return (
    <Modal
      isVisible={showRouletteModal}
      onBackdropPress={() => setShowRouletteModal(false)}
    >
      <View style={{ backgroundColor: "white", borderRadius: 16, padding: 24 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 12 }}>
          🍵 Taza del día
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="#666" />
        ) : (
          cup && (
            <View style={{ alignItems: "center" }}>
              <Image
                source={
                  cup.imageUri
                    ? { uri: cup.imageUri }
                    : require("@/assets/default-cup.png")
                }
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: 8,
                  marginBottom: 12,
                }}
              />
              <Text style={{ fontSize: 20 }}>{cup.name}</Text>
              <TouchableOpacity
                onPress={() => setIsAdding(false)}
                style={{
                  marginTop: 24,
                  padding: 12,
                  backgroundColor: "#2f95dc",
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: "#fff" }}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          )
        )}
      </View>
    </Modal>
  );
}
