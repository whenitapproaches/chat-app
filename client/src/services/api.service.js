import axios from "axios"

import configs from "@/configs"

const SERVER_URL = `${configs.HOST}/api`

const ApiService = axios.create({
  baseURL: SERVER_URL,
})

ApiService.setBaseToken = (token) => {
  ApiService.defaults.headers.common["Authorization"] = `Bearer ${token}`
}

export default ApiService

export const AccountService = {
  fetchFriends(page = 0) {
    return ApiService.get("profile/friends", {
      withCredentials: true,
      params: {
        page,
      },
    })
  },
  searchByUsername(username) {
    const CancelToken = axios.CancelToken
    const source = CancelToken.source()

    const request = () =>
      ApiService.get("user", {
        params: {
          username,
        },
        withCredentials: true,
        cancelToken: source.token,
      })

    return {
      request,
      source,
    }
  },
  removeFriend(userId) {
    return ApiService.get("profile/friends/remove/" + userId, {
      withCredentials: true,
    })
  },
  respondFriend({ userId, status }) {
    return ApiService.get("profile/friends/respond/" + userId, {
      params: {
        accept: status ? 1 : 0,
      },
      withCredentials: true,
    })
  },
  addFriend(userId) {
    return ApiService.get("profile/friends/add/" + userId, {
      withCredentials: true,
    })
  },
}

export const ImageService = {
  upload(file, partnerUsername, messageClientId) {
    const formData = new FormData()
    formData.append("image", file)

    return ApiService.post(
      `image/${partnerUsername}/${messageClientId}`,
      formData,
      {
        withCredentials: true,
      }
    )
  },
  read(imageName) {
    return ApiService.get(`image/${imageName}`, {
      withCredentials: true,
      responseType: "blob",
    })
  },
}

export const ChatService = {
  fetchMessages({ offset, partnerUsername }) {
    return ApiService.get(`message/to/${partnerUsername}`, {
      withCredentials: true,
      params: {
        offset,
      },
    })
  },
  fetchRecentMessages({ offset }) {
    return ApiService.get(`message/recent`, {
      withCredentials: true,
      params: {
        offset,
      },
    })
  },
}

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
