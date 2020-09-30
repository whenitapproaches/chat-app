import { reactive } from "vue"

export default () => {
  const profile = reactive({})

  const fetchFriends = async () => {
    try {
      let response = await ProfileService.fetchFriends()
    } catch (err) {}
  }

  return {
    profile,
  }
}
