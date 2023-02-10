import { Pressable, ScrollView, Text, TextInput, View, Image, AsyncStorage } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import useLogin from "../hooks/useLogin"
import Logo from "../assets/logo.png"
import { useEffect, useContext, useState } from "react"
import IsAuthenticatedContext from "../contexts/isAuthenticatedContext"

export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { handleLogin, errorMessage, isLoading } = useLogin()
  const { isAuthenticated, setIsAuthenticated } = useContext(IsAuthenticatedContext)
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token")
      if (token) {
        setIsAuthenticated(true)
      }
    }
    checkToken()
  }, [])
  return (
    <ScrollView className="bg-black" contentContainerStyle={{ justifyContent: "center", height: "100%" }}>
      <View className="p-4 mb-24">
        <Image resizeMethod="cover" resizeMode="cover" className="aspect-square w-24 h-24 mx-auto" source={Logo} />
        <View className="flex-row justify-center gap-2">
          <Text
            style={{
              fontFamily: "Pacifico-Regular",
            }}
            className="text-4xl py-2 text-center text-light mb-2">
            Catstagram
          </Text>
        </View>
        <View>
          <View className="flex-row gap-4">
            <View className="flex-1 mt-8 mb-4 relative">
              <TextInput placeholderTextColor="#f1f1f1" className="rounded-full text-light bg-dark py-2.5 px-4 shadow-xl" onChangeText={setUsername} placeholder="Username" />
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
              <TextInput
                placeholderTextColor="#f1f1f1"
                className="rounded-full text-light bg-dark py-2.5 px-4 shadow-xl mb-4"
                onChangeText={setPassword}
                secureTextEntry
                placeholder="Password"
              />
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
        <Text className="mb-4 text-lg mt-8 font-bold text-light">Not signed up yet?</Text>
        <Pressable
          className="bg-dark rounded-full py-1.5 px-4 shadow-xl self-start"
          onPress={() => {
            navigation.navigate("Register")
          }}>
          <Text className="text-lg font-bold text-light">Create an account</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}
