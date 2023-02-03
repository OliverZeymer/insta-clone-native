import { Pressable, ScrollView, Text, TextInput, View } from "react-native"
import Icon from "react-native-vector-icons/Feather"
export default function HomeScreen({ navigation }) {
  return (
    <ScrollView className="bg-black p-4">
      <View className="">
        <Text className="text-7xl font-bold tracking-tight text-light">Log in</Text>
        <Text className="text-2xl font-bold text-light">Search</Text>
        <View className="flex-row gap-4">
          <View className="flex-1 relative">
            <TextInput className="rounded-full text-light bg-dark py-2.5 px-4 shadow-xl" placeholder="Username" />
            <Icon
              name="search"
              size={24}
              color="#f8f8f8"
              style={{
                position: "absolute",
                right: 12,
                top: 6,
              }}
            />
          </View>
        </View>
        <Text className="mb-8 text-4xl font-bold text-light">Feed</Text>
      </View>
    </ScrollView>
  )
}
