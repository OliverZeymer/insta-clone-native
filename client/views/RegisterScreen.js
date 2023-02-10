import { useState } from "react"
import { Alert, Pressable, ScrollView, Text, TextInput, View } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import useRegister from "../hooks/useRegister"

export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { handleRegister, errorMessage, isLoading } = useRegister()
  return (
    <ScrollView className="bg-black p-4" contentContainerStyle={{ justifyContent: "center", height: "100%" }}>
      <View>
        <Text className="text-5xl font-bold tracking-tight text-light">Register</Text>
        <Text className="text-2xl font-bold text-light mb-6">Create your account here!</Text>
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
              handleRegister(username, password)
              !isLoading && !errorMessage && Alert.alert("Success!", "You have successfully registered!", [{ text: "OK", onPress: () => navigation.navigate("Login") }])
            }}>
            <Text className="text-2xl font-bold text-light text-center">{isLoading ? "Loading..." : "Register"}</Text>
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
        <Text className="mb-4 text-2xl mt-8 font-bold text-light">Already registered?</Text>
        <Pressable
          className="bg-dark rounded-full py-2.5 px-4 shadow-xl self-start"
          onPress={() => {
            navigation.navigate("Login")
          }}>
          <Text className="text-2xl font-bold text-light px-8">Log in</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}
