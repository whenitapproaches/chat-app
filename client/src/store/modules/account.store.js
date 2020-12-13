import { AccountService } from "@/services/api.service"

const initialState = () => ({
  relationships: [],
})

export default {
  namespaced: true,
  state: initialState(),
  getters: {
    friends: (state) =>
      state.relationships.filter((relationship) => !relationship.isPending),
  },
  actions: {
    fetchRelationships: async ({ commit }) => {
      try {
        const response = await AccountService.fetchFriends()
        const responseData = response.data
        const { relationships } = responseData
        commit("updateRelationships", relationships)
      } catch (err) {
        console.log(err)
      }
    },
    removeFriend: async ({ commit }, userId) => {
      try {
        await AccountService.removeFriend(userId)
      } catch (err) {}
    },
    addFriend: async ({ commit }, userId) => {
      try {
        await AccountService.addFriend(userId)
      } catch (err) {}
    },
    respondFriend: async ({ commit }, { userId, status }) => {
      try {
        await AccountService.respondFriend({ userId, status })
      } catch (err) {}
    },
  },
  mutations: {
    updateRelationships: (state, relationships) => {
      state.relationships = relationships
    },
    resetAccount: (state) => (state = initialState()),
  },
}
