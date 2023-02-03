import { useState } from "react"

export default function useCreateUser() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleCreateUser = async (username, password) => {
    setIsLoading(true)
    try {
      const response = await fetch("http://10.160.212.8:8080/api/v1/users", {
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
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }

    return { handleCreateUser, errorMessage, isLoading }
  }
}
