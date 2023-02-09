import Icon from "react-native-vector-icons/Feather"
import shortenNumber from "../functions/shortenNumber"
import { ActivityIndicator, Image, Pressable, Text, View, Animated, Easing } from "react-native"
import { useEffect, useState } from "react"
export default function Post({ item }) {
  const [scaleValue] = useState(new Animated.Value(0))
  const [liked, setLiked] = useState(false)
  const [imageIsLoaded, setImageIsLoaded] = useState(false)
  const [firstTap, setFirstTap] = useState(null)
  const [showHeartAnimation, setShowHeartAnimation] = useState(false)
  const scaleHeart = () => {
    scaleValue.setValue(0)
    Animated.timing(scaleValue, {
      useNativeDriver: true,
      toValue: 2,
      duration: 300,
      easing: Easing.easeOutBack,
    }).start()
  }
  const handlePress = () => {
    const now = Date.now()
    if (firstTap && now - firstTap < 300) {
      setLiked(!liked)
      setFirstTap(null)
      scaleHeart()
      setShowHeartAnimation(true)
      setTimeout(() => {
        setShowHeartAnimation(false)
      }, 300)
    } else {
      setFirstTap(now)
    }
  }

  useEffect(() => {
    let timeoutId = null
    if (firstTap) {
      timeoutId = setTimeout(() => {
        setFirstTap(null)
      }, 300)
    }
    return () => {
      clearTimeout(timeoutId)
    }
  }, [firstTap])
  return (
    <Pressable onPress={handlePress}>
      <View className="rounded-2xl bg-dark pb-4 mb-8">
        {showHeartAnimation && (
          <Animated.View
            style={{
              transform: [
                {
                  scale: scaleValue.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ],
              zIndex: 999,
              position: "absolute",
              top: "20%",
              left: "50%",
            }}>
            <Icon name="heart" size={100} color={liked ? "#FF0000" : "#f8f8f8"} style={{ position: "absolute", top: "100%", left: "50%", transform: [{ translateX: -50 }], zIndex: 999 }} />
          </Animated.View>
        )}
        {!imageIsLoaded && (
          <ActivityIndicator
            size="large"
            style={{
              position: "absolute",
              top: "35%",
              left: "50%",
              transform: [{ translateX: -15 }],

              zIndex: 1,
            }}
          />
        )}
        <Image onLoad={() => setImageIsLoaded(true)} source={{ uri: item.photo }} resizeMethod="cover" resizeMode="cover" className="rounded-t-2xl w-full aspect-square mb-2" />
        <View className="px-4">
          <View className="flex-row gap-4">
            <Pressable
              onPress={() => {
                setLiked(!liked)
              }}>
              <Icon name="heart" size={28} color={liked ? "#FF0000" : "#f8f8f8"} />
            </Pressable>
            <Icon name="message-circle" size={28} color="#f8f8f8" />
            <Icon name="share" size={28} color="#f8f8f8" />
          </View>
          <Text className="text-white my-2">
            {shortenNumber(liked ? item.likes.length + 1 : item.likes.length)}
            {liked ? ` likes` : item.likes.length === 1 ? ` Like` : ` Likes`}
          </Text>
          <View className="bg-neutral-400 h-[0.5px]" />
          <View className="flex-row mt-2">
            <View className="flex h-6 w-6 rounded-full items-center justify-center bg-black text-xs font-bold text-light">
              <Text className="text-light">{item.user[0]}</Text>
            </View>
            <Text className="text-white text-base ml-2">{item.user}</Text>
          </View>
          <Text className="text-white text-lg">{item.description}</Text>
        </View>
      </View>
    </Pressable>
  )
}
