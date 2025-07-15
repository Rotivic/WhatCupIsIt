import { useAddCup, useUpdateCup } from "@/hooks/cups/useCups";
import { Cup } from "@/types/Cups";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  Switch,
  Text,
  TextInput,
  View,
} from "react-native";
import BaseModal from "../ui/BaseModal";

export default function CupFormModal({
  isVisible,
  onClose,
  defaultValues,
}: {
  isVisible: boolean;
  onClose: () => void;
  defaultValues?: Cup;
}) {
  const [name, setName] = useState("");
  const [imageUri, setImageUri] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const { mutate: addCup } = useAddCup();
  const { mutate: updateCup } = useUpdateCup();

  // 🧠 Inicializar datos al abrir
  useEffect(() => {
    if (defaultValues) {
      setName(defaultValues.name);
      setImageUri(defaultValues.imageUri);
      setIsFavorite(!!defaultValues.is_favorite);
    } else {
      setName("");
      setImageUri("");
      setIsFavorite(false);
    }
  }, [defaultValues, isVisible]);

  // 📸 Lanzar cámara
  const openCamera = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // 🖼️ Lanzar galería
  const pickFromGallery = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  // 📋 Mostrar opciones
  const chooseImage = () => {
    Alert.alert(
      "Seleccionar imagen",
      "¿Desde dónde deseas obtener la imagen?",
      [
        { text: "Cámara", onPress: openCamera },
        { text: "Galería", onPress: pickFromGallery },
        { text: "Cancelar", style: "cancel" },
      ]
    );
  };

  // ✅ Guardar datos
  const handleSubmit = () => {
    if (!name.trim()) return alert("El nombre es obligatorio");

    const payload = {
      name,
      imageUri,
      is_favorite: isFavorite ? 1 : 0,
    };

    if (defaultValues?.id) {
      updateCup({ id: defaultValues.id, ...payload }, { onSuccess: onClose });
    } else {
      addCup(payload, { onSuccess: onClose });
    }
  };

  return (
    <BaseModal
      isVisible={isVisible}
      onClose={onClose}
      title={defaultValues ? "Editar taza" : "Nueva taza"}
      onSubmit={handleSubmit}
    >
      <TextInput
        placeholder="Nombre de la taza"
        value={name}
        onChangeText={setName}
        className="border p-2 mb-2 rounded"
      />

      <Pressable onPress={chooseImage} className="mb-2">
        {imageUri ? (
          <Image
            source={{ uri: imageUri }}
            style={{ width: "100%", height: 180, borderRadius: 8 }}
          />
        ) : (
          <View className="border p-4 rounded bg-gray-100 items-center">
            <Text>Tocar para seleccionar imagen</Text>
          </View>
        )}
      </Pressable>

      <View className="flex-row items-center mb-2">
        <Switch value={isFavorite} onValueChange={setIsFavorite} />
        <Text className="ml-2">Favorita</Text>
      </View>
    </BaseModal>
  );
}
