import React from "react";
import { Pressable, Text } from "react-native";

type ButtonProps = {
  title: string;
  onPress?: () => void;
};

export default function Button({ title, onPress }: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-blue-500 p-3 items-center rounded-md w-full"
    >
      <Text className="text-white font-semibold">{title}</Text>
    </Pressable>
  );
}
