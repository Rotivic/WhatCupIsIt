import { useCups } from "@/hooks/cups/useCups";
import { FlatList } from "react-native";
import CupCard from "./CupCard";

export default function CupsList() {
  const { data: cups } = useCups();

  return (
    <FlatList
      data={cups}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <CupCard cup={item} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 16,
        paddingBottom: 24,
      }}
    />
  );
}
