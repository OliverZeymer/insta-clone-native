import { Pressable, Text, AsyncStorage } from "react-native"
import { useContext } from "react"
import IsAuthenticatedContext from "../contexts/isAuthenticatedContext"
import Icon from "react-native-vector-icons/Feather"

export default function LogOutButton() {
  const { setIsAuthenticated } = useContext(IsAuthenticatedContext)
  return (
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
  )
}
