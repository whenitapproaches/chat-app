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
  signup(info) {
    return ApiService.post("user/signup", info, {
      withCredentials: true,
    })
  },
  refreshJWT() {
    return ApiService.post("user/jwt", null, {
      withCredentials: true,
    })
  },
}
