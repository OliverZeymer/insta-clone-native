import { useEffect, useState } from "react"
import { Image, Pressable, ScrollView, Text, TextInput, View, AsyncStorage, Alert } from "react-native"
import * as ImagePicker from "expo-image-picker"
import Icon from "react-native-vector-icons/Feather"
import axios from "axios"
import useAxios from "../hooks/useAxios"

export default function CreateScreen({ navigation }) {
  const { data, loading, error, refresh } = useAxios("http://10.160.213.42:8080/api/v1/profile", "get")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [image, setImage] = useState(null)
  const [user, setUser] = useState("user")
  const [description, setDescription] = useState("")
  const [imageData, setImageData] = useState()
  useEffect(() => {
    if (!loading) {
      setUser(data.username)
    }
  }, [loading])
  async function pickImage() {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
      const splitArray = result.assets[0].uri.split("/")
      const name = splitArray[splitArray.length - 1]
      const mimeType = name.split(".")[1]
      setImageData({
        uri: result.assets[0].uri,
        type: `image/${mimeType}`,
        name: name,
      })
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.append("file", imageData)
      formData.append("user", user)
      formData.append("description", description)
      axios.post("http://10.160.213.42:8080/api/v1/posts", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      })
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
      Alert.alert("Success!", "Your post was successfully created!", [
        {
          text: "To Feed",
          onPress: () => {
            navigation.navigate("Home")
          },
        },
      ])
    }
  }
  return (
    <View className="p-4 flex-1 bg-black">
      <ScrollView
        contentContainerStyle={{
          justifyContent: "center",
          height: "100%",
        }}>
        <Text
          style={{
            fontFamily: "Pacifico-Regular",
          }}
          className="text-4xl py-2 text-center text-light mb-2">
          Create Post
        </Text>

        <TextInput
          placeholder="Write a caption..."
          placeholderTextColor="#f1f1f1"
          className="rounded-2xl text-light h-24 bg-dark py-2.5 px-4 shadow-xl"
          multiline
          value={description}
          onChangeText={(text) => setDescription(text)}
        />

        <Pressable className="bg-dark rounded-full py-2.5 px-4 shadow-xl flex-row justify-center items-center my-4" onPress={pickImage}>
          <Text className="text-xl font-bold text-light text-center mr-2">Choose image</Text>
          <Icon name="image" size={24} color="#f8f8f8" />
        </Pressable>
        {image ? (
          <Image source={{ uri: image }} resizeMethod="cover" resizeMode="cover" className="rounded-lg aspect-square mb-4 w-full" />
        ) : (
          <Text className="text-xl font-bold text-light text-center mb-4">No image chosen</Text>
        )}
        {error && <Text className="text-xl font-bold text-light text-center mb-4">{error}</Text>}
        <Pressable className="bg-dark rounded-full py-2.5 px-4 shadow-xl my-4" onPress={image ? handleCreate : null} disabled={isSubmitting}>
          <Text className="text-xl font-bold text-light text-center">Create!</Text>
        </Pressable>
      </ScrollView>
    </View>
  )
}
