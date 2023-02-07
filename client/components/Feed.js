import { ActivityIndicator, FlatList, Image, Text, View } from "react-native"
import useAxios from "../hooks/useAxios"
import Icon from "react-native-vector-icons/Feather"
import shortenNumber from "../functions/shortenNumber"
const Feed = () => {
  const { data, error, loading } = useAxios("http://10.160.213.42:8080/api/v1/posts")
  return (
    <>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error: {error}</Text>}
      {data && (
        <FlatList
          data={data}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View className="rounded-2xl bg-dark p-4 mb-14">
              <Image
                source={{ uri: item.photo }}
                resizeMethod="cover"
                resizeMode="cover"
                className="
                rounded-2xl
                w-full
                aspect-square
                mb-4"
              />
              <View className="flex-row gap-6">
                <Icon name="heart" size={24} color="#f8f8f8" />

                <Icon name="message-circle" size={24} color="#f8f8f8" />
                <Icon name="share" size={24} color="#f8f8f8" />
              </View>
              <Text className="text-white my-2">{shortenNumber(item.likes.length)} Likes</Text>
              <Text className="text-white text-lg">{item.description}</Text>
            </View>
          )}
        />
      )}
    </>
  )
}
export default Feed
