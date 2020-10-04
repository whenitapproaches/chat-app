import { reactive, toRefs } from "vue"
import { ProfileService } from "@/services/api.service"

export default () => {
  const profile = reactive({
    friends: [],
  })

  const fetchFriends = async () => {
    try {
      let response = await ProfileService.fetchFriends()
      let responseData = response.data
      let friends = responseData.friends
      profile.friends = friends
    } catch (err) {}
  }

  return {
    profile: toRefs(profile),
    fetchFriends,
  }
}
