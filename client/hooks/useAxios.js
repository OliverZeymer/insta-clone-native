import axios from "axios"
import { useState, useEffect } from "react"
import { AsyncStorage } from "react-native"

const useAxios = (url, method = "get") => {
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const token = await AsyncStorage.getItem("token")
        console.log(token)
        const newHeaders = { Authorization: `Bearer ${token}` }
        let response
        if (method === "get") {
          response = await axios.get(url, { headers: newHeaders })
        } else if (method === "post") {
          response = await axios.post(url, body, { headers: newHeaders })
        }
        setData(response.data)
        setLoading(false)
      } catch (e) {
        setError(e)
        setLoading(false)
      }
    }
    fetchData()
  }, [url, method])

  return { data, error, loading }
}

export default useAxios
