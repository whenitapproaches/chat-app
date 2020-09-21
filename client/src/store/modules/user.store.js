import { computed, reactive, toRefs } from "vue"
import { AuthService } from "@/services/api.service"

export default () => {
  const currentUser = reactive({
    username: "",
    token: null,
  })

  const login = async (credentials) => {
    try {
      const response = await AuthService.login(credentials)
      const responseData = response.data

      if (responseData.success) {
        currentUser.username = responseData.username
        currentUser.token = responseData.token

        return
      }

      return
    } catch (err) {
      console.log(err)
    }
  }

  const isLoggedIn = computed(() => {
    return !!currentUser.token
  })

  return {
    currentUser: toRefs(currentUser),
    login,
    isLoggedIn,
  }
}
