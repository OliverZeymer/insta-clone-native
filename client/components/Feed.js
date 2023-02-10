import { ActivityIndicator, FlatList, Text, RefreshControl } from "react-native"
import useAxios from "../hooks/useAxios"

import { useState } from "react"
import Post from "./Post"
import GreetingMessage from "./GreetingMessage"
import LogOutButton from "./LogOutButton"
const Feed = ({ profileData }) => {
  const { data, error, loading, refresh } = useAxios("http://10.160.213.42:8080/api/v1/posts")
  const [isRefreshing, setIsRefreshing] = useState(false)
  const handleRefresh = () => {
    setIsRefreshing(true)
    refresh()
    setIsRefreshing(false)
  }

  return (
    <>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error: {error}</Text>}
      {data && (
        <FlatList
          data={data}
          refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <Post key={item._id} item={item} refresh={refresh} />}
          ListHeaderComponent={<GreetingMessage data={profileData} />}
          ListFooterComponent={<LogOutButton />}
        />
      )}
    </>
  )
}
export default Feed
