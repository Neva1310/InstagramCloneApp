import { FlatList, Platform } from "react-native";
import posts from "~/assets/data/posts.json";
import PostListItem from "~/src/components/PostListItem";

export default function FeedScreen() {
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => <PostListItem post={item} />}
      contentContainerStyle={{
        gap: 10,
        maxWidth: 512,
        width: "100%",
        backgroundColor: "white",
        alignSelf: "center",
      }}
      
      showsVerticalScrollIndicator={false}
    />
  );
}
