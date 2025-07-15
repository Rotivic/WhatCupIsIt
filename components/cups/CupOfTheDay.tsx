import { getTodayCupIfExists } from "@/helpers/getTodayCupIfExists";
import { saveCupOfTheDay } from "@/helpers/saveCupOfTheDay";

import { useCups } from "@/hooks/cups/useCups";
import { useCupHistoryStore } from "@/store/useCupHistoryStore";
import { Cup } from "@/types/Cups";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";
import WheelOfCups from "./WheelOfCups";

export default function CupOfTheDay() {
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(true);
  const [cup, setCup] = useState<Cup | null>(null);
  const { setHasSpun } = useCupHistoryStore();
  const { data: cups, isLoading: cupsLoading } = useCups();

  useEffect(() => {
    getTodayCupIfExists().then((existing) => {
      setCup(existing);
      setLoading(false);
    });
  }, []);

  const handleWheelSelect = async (selected: Cup) => {
    setCup(selected);
    await saveCupOfTheDay(selected.id);
    setHasSpun(true); // <-- Aquí activas el flag
    queryClient.invalidateQueries({ queryKey: ["cup-usage-history"] });
  };

  if (loading || cupsLoading) {
    return (
      <View className="p-4 m-4 bg-gray-100 rounded-xl items-center">
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View className="p-4 m-4 bg-white rounded-xl shadow items-center space-y-2">
      <Text className="text-xl font-bold">☕ Taza del día</Text>

      {cup ? (
        <>
          <Image
            source={
              cup.imageUri
                ? { uri: cup.imageUri }
                : require("@/assets/default-cup.png")
            }
            style={{ width: 120, height: 120, borderRadius: 8 }}
          />
          <Text className="text-lg">{cup.name}</Text>
        </>
      ) : (
        <>
          <Text className="text-gray-500 text-sm mb-2">
            ¡Gira la ruleta para descubrir tu taza de hoy!
          </Text>
          <WheelOfCups cups={cups} onSelect={handleWheelSelect} />
        </>
      )}
    </View>
  );
}
