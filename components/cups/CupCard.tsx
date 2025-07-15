import { Heart } from "lucide-react-native";
import React from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";

interface CupCardProps {
  cup: {
    id: number;
    name: string;
    imageUri: string;
    is_favorite: number;
  };
  onPress?: () => void;
}

const screenWidth = Dimensions.get("window").width;

export default function CupCard({ cup, onPress }: CupCardProps) {
  const hasImage = !!cup.imageUri?.trim();
  const source = hasImage
    ? { uri: cup.imageUri }
    : require("../../assets/default-cup.png");

  return (
    <TouchableOpacity
      className="bg-white rounded-2xl shadow-md p-4 mb-4 flex-row items-center self-center"
      style={{ width: screenWidth - 32 }} // 16px padding left/right
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Image
        source={source}
        style={{ width: 96, height: 96, borderRadius: 12 }}
        className="bg-gray-100 mr-4"
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text className="text-lg font-semibold text-gray-900">{cup.name}</Text>
      </View>
      <Heart
        fill={cup.is_favorite ? "red" : "transparent"}
        color={cup.is_favorite ? "white" : "gray"}
        size={28}
      />
    </TouchableOpacity>
  );
}
