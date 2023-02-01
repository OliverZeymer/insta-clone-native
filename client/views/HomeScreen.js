import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
export default function HomeScreen({ navigation }) {
  return (
    <ScrollView className="bg-black p-4">
      <View className="">
        <Text className="text-7xl font-bold tracking-tight text-[#f8f8f8]">Home</Text>
        <Text className="mb-8 text-4xl font-bold text-[#f8f8f8]">Search</Text>
        <View className="flex-row gap-4">
          <Pressable
            className="flex-1 rounded-full bg-[#1a1a1a] py-2.5 px-4 shadow-xl"
            onPress={() => {
              navigation.navigate("Search", { type: "anime" });
            }}>
            <View className="flex-row items-center justify-center">
              <Icon name="search" size={24} color="#f8f8f8" />
              <Text className="font-bold text-[#f8f8f8]">Anime</Text>
            </View>
          </Pressable>
        </View>
        <Text className="mb-8 text-4xl font-bold text-[#f8f8f8]">Top 10 Anime</Text>
      </View>
    </ScrollView>
  );
}
