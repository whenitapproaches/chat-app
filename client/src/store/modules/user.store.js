import { computed, reactive, toRefs, ref } from "vue"
import ApiService, { AuthService } from "@/services/api.service"

export default () => {
  const currentUser = reactive({
    username: "",
    token: null,
  })

  const isLoggedIn = computed(() => {
    return !!currentUser.token
  })

  const refreshJWT = async () => {
    try {
      let response = await AuthService.refreshJWT()
      let responseData = response.data

      let username = responseData.username
      let token = responseData.token
      let tokenExpiredIn = responseData.tokenExpiredIn

      currentUser.username = username
      currentUser.token = token

      ApiService.defaults.headers.common["Authorization"] = `Bearer ${token}`
      setTimeout(refreshJWT, tokenExpiredIn)
      return token
    } catch (error) {
      if(error.response.status === 401) {
        currentUser.username = ''
        currentUser.token = null
      }
      return false
    }
  }

  const login = async (credentials) => {
    try {
      const response = await AuthService.login(credentials)
      const responseData = response.data

      let username = responseData.username
      let token = responseData.token
      let tokenExpiredIn = responseData.tokenExpiredIn

      currentUser.username = username
      currentUser.token = token

      ApiService.defaults.headers.common["Authorization"] = `Bearer ${token}`
      setTimeout(refreshJWT, tokenExpiredIn)
    } catch (err) {
      console.log(err)
    }
  }

  return {
    currentUser: toRefs(currentUser),
    login,
    isLoggedIn,
    refreshJWT,
  }
}
