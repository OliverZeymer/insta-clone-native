import { useState } from "react"
import { Pressable, ScrollView, Text, TextInput, View } from "react-native"
import Icon from "react-native-vector-icons/Feather"
import useCreateUser from "../hooks/useCreateUser"
export default function RegisterScreen({ navigation }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const { handleCreateUser, errorMessage, isLoading } = useCreateUser()
  return (
    <ScrollView className="bg-black p-4">
      <View>
        <Text className="text-7xl font-bold tracking-tight text-light">Register</Text>
        <Text className="text-2xl font-bold text-light">Create your account here!</Text>
        <View className="flex-1 gap-y-1">
          <View className="flex-row gap-4">
            <View className="flex-1 relative">
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
              <TextInput className="rounded-full text-light bg-dark py-2.5 px-4 shadow-xl" secureTextEntry={true} onChangeText={setPassword} placeholder="Password" />
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
          <Pressable className="bg-dark rounded-full py-2.5 px-4 shadow-xl" onPress={() => handleCreateUser(username, password)}>
            <Text className="text-2xl font-bold text-light text-center">Log in</Text>
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
        </View>
        <Text className="mb-4 text-2xl mt-8 font-bold text-light">Already have an account?</Text>
        <Pressable
          className="bg-dark rounded-full py-2.5 px-6 shadow-xl self-start"
          onPress={() => {
            navigation.navigate("Login")
          }}>
          <Text className="text-2xl font-bold text-light">Log in</Text>
        </Pressable>
      </View>
    </ScrollView>
  )
}
