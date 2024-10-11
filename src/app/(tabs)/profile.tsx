import React, { useState } from "react";
import { Text, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { View, Image } from "react-native";
import Button from "~/src/components/Button";
import { supabase } from "~/src/lib/supabase";

export default function ProfileScreen() {
  const [image, setImage] = useState<string | null>(null);
  const [username, setUsername] = useState("");

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View className="p-3 flex-1">
      <Image
        source={{ uri: image ? image : undefined }} // Display the image based on state
        className="w-52 aspect-square rounded-full shadow-md bg-slate-300 self-center"
      />
      <Text
        onPress={pickImage}
        className="text-blue-500 font-semibold m-5 self-center"
      >
        Change
      </Text>
      <Text className="mb-2 text-gray-700 font-semibold">Username</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(newValue) => setUsername(newValue)}
        className="border border-gray-300 p-3 rounded-md"
      />
      <View className="gap-2 mt-auto">
        <Button title="Update profile" />
        <Button title="Sign out" onPress={() => supabase.auth.signOut()}/>
      </View>
    </View>
  );
}
