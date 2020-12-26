import ApiService, { AuthService } from "@/services/api.service"
import SocketService from "@/services/socket.service"

const initialState = () => ({
  errorSignIn: "",
  isOnPageLogin: true,
})

export default {
  namespaced: true,
  state: initialState(),
  getters: {},
  actions: {
    updateIsOnPageLogin: ({ commit }, status) => {
      commit("updateIsOnPageLogin", status)
    },
    refreshJWT: async ({ commit, dispatch }) => {
      try {
        let response = await AuthService.refreshJWT()
        let responseData = response.data
        const { username, token, tokenExpiredIn, _id } = responseData
        commit(
          "user/setUser",
          {
            username,
            token,
            _id,
          },
          {
            root: true,
          }
        )
        ApiService.setBaseToken(token)
        setTimeout(() => dispatch("refreshJWT"), tokenExpiredIn)
        SocketService.connectAuth({ token })
      } catch (error) {
        if (error.response.status === 401) {
          commit("user/resetUser", null, {
            root: true,
          })
        }
      }
    },
    signIn: async ({ commit, dispatch }, credentials) => {
      try {
        const response = await AuthService.login(credentials)
        const responseData = response.data
        const { username, token, tokenExpiredIn, _id } = responseData
        commit(
          "user/setUser",
          {
            username,
            token,
            _id,
          },
          { root: true }
        )
        ApiService.setBaseToken(token)
        setTimeout(() => dispatch("refreshJWT"), +tokenExpiredIn)
        SocketService.connect()
        SocketService.connectAuth({ token })
        commit("updateErrorSignIn", "")
      } catch (err) {
        commit(
          "updateErrorSignIn",
          "Please check again your username or password."
        )
      }
    },
    signOut: async ({ commit }) => {
      try {
        await AuthService.logOut()
        commit("user/resetUser", null, {
          root: true,
        })
        commit("chat/resetChat", null, {
          root: true
        })
        commit("account/resetAccount", null, {
          root: true
        })
        SocketService.disconnect()
      } catch (err) {
        console.log(err)
      }
    },
    signUp: async ({commit}, info) => {
      try {
        await AuthService.signUp(info)
        commit("updateIsOnPageLogin", true)
      } catch (err) {
        console.log(err)
      }
    },
  },
  mutations: {
    updateIsOnPageLogin: (state, status) => (state.isOnPageLogin = status),
    updateError: (state, error) => (state.error = error),
    updateErrorSignIn: (state, error) => (state.errorSignIn = error),
  },
}
