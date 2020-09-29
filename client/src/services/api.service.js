import axios from "axios"

const SERVER_URL = "http://localhost:3000/api"

const ApiService = axios.create({
  baseURL: SERVER_URL,
})

export default ApiService

export const AuthService = {
  login(credentials) {
    return ApiService.post("user/login", credentials, {
      withCredentials: true,
    })
  },
  signUp(info) {
    return ApiService.post("user/signup", info, {
      withCredentials: true,
    })
  },
  refreshJWT() {
    return ApiService.post("user/jwt", null, {
      withCredentials: true,
    })
  },
  logOut() {
    return ApiService.post("user/logout", null, {
      withCredentials: true,
    })
  },
  checkUsernameAvailability(username) {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()

    const request = () =>
      ApiService.get("user/availability", {
        params: {
          username,
        },
        cancelToken: source.token,
      })

    return {
      request,
      source,
    }
  },
}
