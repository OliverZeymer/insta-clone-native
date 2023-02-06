import { useContext, useState } from "react"
import IsAuthenticatedContext from "../contexts/isAuthenticatedContext"
import storeToken from "../functions/storeToken"

export default function useLogin() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { setIsAuthenticated } = useContext(IsAuthenticatedContext)
  const handleLogin = async (username, password) => {
    setIsLoading(true)
    try {
      const response = await fetch("http://10.160.213.42:8080/auth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      })
      const data = await response.json()
      if (data.error) {
        setErrorMessage(data.error)
      } else {
        storeToken(data.token)
        setIsAuthenticated(true)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return { handleLogin, errorMessage, isLoading }
}
