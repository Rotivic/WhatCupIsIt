import { View } from "react-native";

export default function CupCardSkeleton() {
  return (
    <View
      style={{
        padding: 16,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#f3f3f3",
        marginBottom: 12,
      }}
    >
      <View
        style={{
          width: 64,
          height: 64,
          borderRadius: 32,
          backgroundColor: "#ccc",
          marginRight: 12,
        }}
      />
      <View style={{ flex: 1 }}>
        <View
          style={{
            height: 12,
            backgroundColor: "#ddd",
            width: "60%",
            marginBottom: 8,
          }}
        />
        <View style={{ height: 12, backgroundColor: "#eee", width: "40%" }} />
      </View>
    </View>
  );
}
