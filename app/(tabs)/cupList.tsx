import CupCardSkeleton from "@/components/cups/CupCardSkeleton";
import CupsList from "@/components/cups/CupsList";
import { Suspense } from "react";
import { SafeAreaView } from "react-native";

export default function ListadoPage() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Suspense fallback={<CupCardSkeleton />}>
        <CupsList />
      </Suspense>
    </SafeAreaView>
  );
}
