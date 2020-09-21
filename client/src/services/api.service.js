import axios from "axios"

const SERVER_URL = "http://localhost:3000/api"

const ApiService = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
})

export default ApiService

export const AuthService = {
  login(credentials) {
    return ApiService.post("user/login", credentials)
  },
  signup(info) {
    return ApiService.post("signup", info)
  },
}

axios.interceptors.response.use(null, async (error) => {
  let status = error.response.status
  if (status === 404) {
    return router.push({
      name: "404",
    })
  }
  if (status === 401) {
    let config = error.config
    try {
      let response = await AuthService.getJWT()
      let data = response.data
      store.commit("User/setAuth", {
        username: data.username,
        token: data.token,
      })
      config.headers["Authorization"] = `Bearer ${data.token}`
      return Vue.axios.request(config)
    } catch (err) {
      console.log(err)
      return Promise.reject(error)
    }
  }
  if (status === 403) {
    return router.push({
      name: "authentication",
    })
  }
  return Promise.reject(error)
})
