import { computed, reactive, toRefs, ref } from "vue"
import ApiService, { AuthService } from "@/services/api.service"

export default () => {
  const currentUser = reactive({
    username: "",
    token: null,
  })

  const shouldRefreshJWT = ref(true)

  const login = async (credentials) => {
    try {
      const response = await AuthService.login(credentials)
      const responseData = response.data

      currentUser.username = responseData.username
      currentUser.token = responseData.token

      return
    } catch (err) {
      console.log(err)
    }
  }

  const updateShouldRefreshJWT = (status) => {
    shouldRefreshJWT.value = status
  }

  const isLoggedIn = computed(() => {
    return !!currentUser.token
  })

  const refreshJWT = async () => {
    let response = await AuthService.refreshJWT()
    let responseData = response.data

    let username = responseData.username
    let token = responseData.token

    currentUser.username = username
    currentUser.token = token

    ApiService.defaults.headers.common["Authorization"] = `Bearer ${token}`
    setTimeout(refreshJWT, responseData.tokenExpiredIn)
    return token
  }

  return {
    currentUser: toRefs(currentUser),
    login,
    isLoggedIn,
    shouldRefreshJWT,
    updateShouldRefreshJWT,
    refreshJWT,
  }
}
