import React from "react";
import {
  Text,
  View,
  Image,
  useWindowDimensions,
  SafeAreaView,
} from "react-native";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import { AdvancedImage } from "cloudinary-react-native";
import { Cloudinary } from "@cloudinary/url-gen";
import { thumbnail } from "@cloudinary/url-gen/actions/resize";
import { byRadius } from "@cloudinary/url-gen/actions/roundCorners";
import { focusOn } from "@cloudinary/url-gen/qualifiers/gravity";
import { FocusOn } from "@cloudinary/url-gen/qualifiers/focusOn";
import { cld } from "~/src/lib/cloudinary";

export default function PostListItem({ post }: { post: any }) {
  const { width } = useWindowDimensions();

  const image = cld.image(post.image);
  image.resize(
    thumbnail().width(width).height(width)
  );

  const avatar = cld.image(post.user.avatar_url);
  avatar.resize(
    thumbnail().width(48).height(48).gravity(focusOn(FocusOn.faces()))
  );

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="p-3 flex-row items-center gap-2">
        <AdvancedImage
          cldImg={avatar}
          className="w-12 aspect-square rounded-full"
        />
        <Text className="font-bold">{post.user.username}</Text>
      </View>
      <AdvancedImage cldImg={image} className="w-full aspect-[4/3]" />
      <View className="flex-row gap-3 p-3">
        <AntDesign name="hearto" size={24} />
        <Ionicons name="chatbubble-outline" size={24} />
        <Feather name="send" size={24} />
        <Feather name="bookmark" size={24} className="ml-auto" />
      </View>
    </SafeAreaView>
  );
}
