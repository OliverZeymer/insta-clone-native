import { useState } from "react"
import { Pressable, ScrollView, Text, TextInput, View } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import useLogin from "../hooks/useLogin"
export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { handleLogin, errorMessage, isLoading } = useLogin()
  return (
    <ScrollView className="bg-black p-4">
      <View>
        <Text className="text-7xl font-bold tracking-tight text-light">Log in</Text>
        <Text className="text-2xl font-bold text-light mb-6">Log in here!</Text>
        <View>
          <View className="flex-row gap-4">
            <View className="flex-1 mt-8 mb-4 relative">
              <TextInput className="rounded-full text-light bg-dark py-2.5 px-4 shadow-xl" onChangeText={setUsername} placeholder="Username" />
              <Icon
                name="user"
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
          <View className="flex-row gap-4">
            <View className="flex-1 relative">
              <TextInput className="rounded-full text-light bg-dark py-2.5 px-4 shadow-xl mb-4" onChangeText={setPassword} secureTextEntry placeholder="Password" />
              <Icon
                name="lock"
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
          <Pressable
            className="bg-dark rounded-full py-2.5 px-4 shadow-xl"
            onPress={() => {
              handleLogin(username, password)
            }}>
            <Text className="text-2xl font-bold text-light text-center">{isLoading ? "Loading..." : "Log in"}</Text>
            <Icon
              name="log-in"
              size={24}
              color="#f8f8f8"
              style={{
                position: "absolute",
                right: 12,
                top: 13,
              }}
            />
          </Pressable>
          <Text className="text-2xl font-bold text-light text-center">{errorMessage}</Text>
        </View>
        <Text className="mb-4 text-2xl mt-8 font-bold text-light">Not signed up yet?</Text>
        <Pressable
          className="bg-dark rounded-full py-2.5 px-4 shadow-xl self-start"
          onPress={() => {
            navigation.navigate("Register")
          }}>
          <Text className="text-2xl font-bold text-light">Create an account</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}
