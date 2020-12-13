// import { computed, reactive, toRefs } from "vue"
// import ApiService, { AuthService } from "@/services/api.service"
// import socketService from "@/services/socket.service"

// export default () => {
//   const currentUser = reactive({
//     username: "",
//     token: null,
//     _id: "",
//   })

//   const isLoggedIn = computed(() => {
//     return !!currentUser.token
//   })

//   const refreshJWT = async () => {
//     try {
//       let response = await AuthService.refreshJWT()
//       let responseData = response.data

//       let username = responseData.username
//       let token = responseData.token
//       let tokenExpiredIn = responseData.tokenExpiredIn
//       let id = responseData._id

//       currentUser.username = username
//       currentUser.token = token
//       currentUser._id = id

//       ApiService.defaults.headers.common["Authorization"] = `Bearer ${token}`
//       setTimeout(refreshJWT, tokenExpiredIn)
//       socketService.connectAuth({ token })
//       return token
//     } catch (error) {
//       if (error.response.status === 401) {
//         currentUser.username = ""
//         currentUser.token = null
//       }
//       return false
//     }
//   }

//   const login = async (credentials) => {
//     try {
//       const response = await AuthService.login(credentials)
//       const responseData = response.data

//       let username = responseData.username
//       let token = responseData.token
//       let tokenExpiredIn = responseData.tokenExpiredIn
//       let id = responseData._id

//       currentUser.username = username
//       currentUser.token = token
//       currentUser._id = id

//       ApiService.defaults.headers.common["Authorization"] = `Bearer ${token}`
//       setTimeout(refreshJWT, tokenExpiredIn)
//       socketService.connect()
//       socketService.connectAuth({ token })
//     } catch (err) {
//       return err.response.data.error
//     }
//   }

//   const logOut = async () => {
//     try {
//       await AuthService.logOut()
//       currentUser.username = ""
//       currentUser.token = null
//       socketService.disconnect()
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const signUp = async (info) => {
//     try {
//       let response = await AuthService.signUp(info)
//       return response.data
//     } catch (err) {
//       console.log(err)
//     }
//   }

//   const checkUsernameAvailability = (username) => {
//     return AuthService.checkUsernameAvailability(username)
//   }

//   return {
//     currentUser: toRefs(currentUser),
//     login,
//     isLoggedIn,
//     refreshJWT,
//     signUp,
//     logOut,
//     checkUsernameAvailability,
//   }
// }

const initialState = () => ({
  user: {
    token: null,
    username: '',
    _id: null
  }
})

export default {
  namespaced: true,
  state: initialState(),
  getters: {
    username: state => state.user.username,
    id: state => state.user._id
  },
  actions: {
    
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user
    },
    resetUser: (state) => {
      state.user = {}
    }
  }
}