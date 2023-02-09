import { Text, View } from "react-native"

export default function GreetingMessage({ data }) {
  return (
    <View>
      <Text className="text-4xl font-bold text-light mb-6">Welcome {data.username ? data.username : "user"}!</Text>
    </View>
  )
}
