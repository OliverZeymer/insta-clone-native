import { useContext, useEffect } from "react"
import { Pressable, ScrollView, Text, TextInput, View, AsyncStorage } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import Feed from "../components/Feed"
import IsAuthenticatedContext from "../contexts/isAuthenticatedContext"
import useAxios from "../hooks/useAxios"

export default function HomeScreen({ navigation }) {
  const { setIsAuthenticated } = useContext(IsAuthenticatedContext)
  const { data, loading, error } = useAxios("http://10.160.213.42:8080/api/v1/profile", "get")
  useEffect(() => {
    AsyncStorage.getItem("token").then((token) => {
      if (!token) {
        navigation.navigate("Login")
      }
    })
  }, [])
  return !loading ? (
    <ScrollView className="bg-black flex p-4 flex-1">
      <View className="flex-1 flex">
        <Text className="text-4xl font-bold tracking-tight text-light">Your Feed</Text>
        <Text className="text-2xl font-bold text-light mb-6">Welcome {data.username ? data.username : "user"}!</Text>
        {/* <Text className="text-4xl font-bold text-light">Search</Text>
        <View className="flex-row gap-4">
          <View className="flex-1 relative">
            <TextInput placeholderTextColor="#f1f1f1" className="rounded-full text-light bg-dark py-2.5 px-4 shadow-xl" placeholder="Search..." />
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
        </View> */}

        <Feed />
        <Pressable
          className="bg-dark rounded-full py-2.5 px-4 shadow-xl"
          onPress={() => {
            AsyncStorage.removeItem("token")
            setIsAuthenticated(false)
          }}>
          <Text className="text-2xl font-bold text-light text-center">Log out</Text>
          <Icon
            name="log-out"
            size={24}
            color="#f8f8f8"
            style={{
              position: "absolute",
              right: 12,
              top: 13,
            }}
          />
        </Pressable>
      </View>
    </ScrollView>
  ) : (
    <Text className="text-7xl font-bold tracking-tight text-light">Loading...</Text>
  )
}
