import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import HomeScreen from "./views/HomeScreen"
import LoginScreen from "./views/LoginScreen"
import { useState } from "react"
import RegisterScreen from "./views/RegisterScreen"
import IsAuthenticatedContext from "./contexts/isAuthenticatedContext"
const Stack = createNativeStackNavigator()
export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
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
            <Stack.Screen name="Home" component={HomeScreen} />
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
