import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Button from "~/src/components/Button";
import { uploadImage } from "~/src/lib/cloudinary";

export default function NewScreen() {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState<string | null>(null);

  useEffect(() => {
    if (!image) {
      pickImage();
    }
  }, [image]);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };


  const createPost = async () => {
    if (!image) {
      return;
    }
    // Create a new post
    const response = await uploadImage(image);
    console.log(response?.public_id);
    // ...
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View className="p-3 items-center flex-1">
        <Image
          source={{ uri: image ? image : undefined }} // Display the image based on state
          className="w-52 aspect-[3/4] rounded-lg shadow-md bg-slate-300"
        />
        <Text onPress={pickImage} className="text-blue-500 font-semibold m-5">
          Change
        </Text>
        <TextInput
          value={caption}
          onChangeText={(newValue) => setCaption(newValue)}
          placeholder="Write a capption or add a poll..."
          className="border-b-2 border-gray-200 w-full p-3"
          multiline={true}
        />
        <View className="mt-auto w-full">
          <Button title="Share" onPress={createPost} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
