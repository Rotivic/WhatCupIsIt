import CupCardSkeleton from "@/components/cups/CupCardSkeleton";
import CupOfTheDay from "@/components/cups/CupOfTheDay";
import CupHistoryModal from "@/components/history/CupHistoryModal";
import { useCupHistoryStore } from "@/store/useCupHistoryStore";
import React, { Suspense } from "react";
import { Button, SafeAreaView } from "react-native";

export default function HomeScreen() {
  const { setShowHistoryModal, hasSpun } = useCupHistoryStore();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Suspense fallback={<CupCardSkeleton />}>
        <CupOfTheDay />

        {hasSpun && (
          <Button
            title="Ver historial de uso"
            onPress={() => setShowHistoryModal(true)}
          />
        )}
        <CupHistoryModal />
      </Suspense>
    </SafeAreaView>
  );
}
