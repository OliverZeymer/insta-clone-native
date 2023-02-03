import { AsyncStorage } from "react-native"

export default async function storeToken(token) {
  try {
    await AsyncStorage.setItem("token", token)
  } catch (error) {
    console.log(error)
  }
}
