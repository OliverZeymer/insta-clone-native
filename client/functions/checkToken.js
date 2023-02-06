import { AsyncStorage } from "react-native"
import isAuthenticatedContext from "../contexts/isAuthenticatedContext"
import { useContext } from "react"
export default async function checkToken() {
  const { setIsAuthenticated } = useContext(isAuthenticatedContext)
  try {
    const token = await AsyncStorage.getItem("token")
    if (token !== null) {
      setIsAuthenticated(true)
    }
  } catch (error) {
    console.log(error)
  }
}
