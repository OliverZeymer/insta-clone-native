import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "./views/HomeScreen"
import LoginScreen from "./views/LoginScreen"

import { useEffect, useState } from "react"
import checkToken from "./functions/checkToken"
import RegisterScreen from "./views/RegisterScreen"
const Stack = createNativeStackNavigator()
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    checkToken({ isLoggedIn, setIsLoggedIn })
  }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#000",
            color: "#f8f8f8",
          },
          headerTintColor: "#fff",
        }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
