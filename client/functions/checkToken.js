import { AsyncStorage } from "react-native"
export default async function checkToken({ isLoggedIn, setIsLoggedIn }) {
  try {
    const token = await AsyncStorage.getItem("token")
    if (token !== null) {
      setIsLoggedIn(true)
    }
  } catch (error) {
    console.log(error)
  }
}
