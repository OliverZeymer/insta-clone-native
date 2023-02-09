import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "./views/HomeScreen"
import LoginScreen from "./views/LoginScreen"
import { useFonts } from "expo-font"
import { useEffect, useState } from "react"
import RegisterScreen from "./views/RegisterScreen"
import IsAuthenticatedContext from "./contexts/isAuthenticatedContext"
import CreateScreen from "./views/CreateScreen"
const Stack = createNativeStackNavigator()

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  let [fontsLoaded] = useFonts({
    "Pacifico-Regular": require("./assets/Pacifico-Regular.ttf"),
  })
  if (!fontsLoaded) {
    return null
  }
  return (
    <IsAuthenticatedContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: "#000",
              color: "#f8f8f8",
            },
            headerTintColor: "#fff",
          }}>
          {isAuthenticated ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="Create" component={CreateScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </IsAuthenticatedContext.Provider>
  )
}
