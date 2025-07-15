import { resetDatabase } from "@/db/database";
import { Text, TouchableOpacity, View } from "react-native";

export default function SeetingsPage() {
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ padding: 12, borderBottomWidth: 1, borderColor: "#ddd" }}>
        <Text className="">Ejemplo</Text>
        <Text className="">Ejemplo</Text>

        <Text className="">Ejemplo</Text>
        <TouchableOpacity
          onPress={resetDatabase}
          className="bg-red-600 px-5 py-2 rounded-lg"
        >
          <Text className="text-white">Resetear base de datos</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
