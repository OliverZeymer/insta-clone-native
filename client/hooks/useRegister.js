import { useState } from "react"

export default function useRegister() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleRegister = async (username, password) => {
    setIsLoading(true)
    try {
      const response = await fetch("http://10.160.213.42:8080/api/v1/users", {
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
        setErrorMessage(data.error.message)
      }
    } catch (error) {
      setErrorMessage(error.messsage)
    } finally {
      setIsLoading(false)
    }
  }
  return { handleRegister, errorMessage, isLoading }
}
