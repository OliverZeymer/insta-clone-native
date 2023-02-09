import { useEffect, useState } from "react"
import { Image, Pressable, ScrollView, Text, TextInput, View, AsyncStorage } from "react-native"
import * as ImagePicker from "expo-image-picker"
import Icon from "react-native-vector-icons/Feather"
import axios from "axios"
import useAxios from "../hooks/useAxios"

export default function CreateScreen({ navigation }) {
  const { data, loading, error } = useAxios("http://10.160.213.42:8080/api/v1/profile", "get")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [photo, setPhoto] = useState(null)
  const [user, setUser] = useState(data?.username ? data?.username : "user")
  const [description, setDescription] = useState("")

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setPhoto(result.assets[0].uri)
      console.log(result.assets[0].uri)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const formData = new FormData()
      formData.append("photo", photo)
      formData.append("user", user)
      formData.append("description", description)
      const res = await fetch("http://10.160.213.42:8080/api/v1/posts", {
        method: "POST",
        body: formData,
        headers: {
          authorization: `Bearer ${await AsyncStorage.getItem("token")}`,
        },
      })
      const json = await res.json()
      console.log(json)
    } catch (error) {
      console.error(error)
    }
    console.log(formData)
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
        {photo ? (
          <Image source={{ uri: photo }} resizeMethod="cover" resizeMode="cover" className="rounded-lg aspect-square mb-4 w-full" />
        ) : (
          <Text className="text-xl font-bold text-light text-center mb-4">No image chosen</Text>
        )}
        <Pressable className="bg-dark rounded-full py-2.5 px-4 shadow-xl my-4" onPress={handleSubmit} disabled={isSubmitting}>
          <Text className="text-xl font-bold text-light text-center">Create!</Text>
        </Pressable>
      </ScrollView>
    </View>
  )
}
