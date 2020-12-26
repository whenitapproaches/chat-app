import { AccountService } from "@/services/api.service"
import { filter, slice, findIndex } from "lodash"

const initialState = () => ({
  relationships: [],
})

export default {
  namespaced: true,
  state: initialState(),
  getters: {
    friends: (state) =>
      state.relationships.filter(
        (relationship) => relationship.status === "friend"
      ),
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
    removeFriend: async ({ commit }, receiver) => {
      try {
        await AccountService.removeFriend(receiver)
        commit("removeRelationship", receiver)
      } catch (err) {}
    },
    addFriend: async ({ commit }, receiver) => {
      try {
        await AccountService.addFriend(receiver)
        commit("pushToRelationships", receiver)
      } catch (err) {
        console.log(err)
      }
    },
    respondFriend: async ({ commit }, { receiver, status }) => {
      try {
        await AccountService.respondFriend({ receiver, status })
        if (status)
          return commit("updateRelationship", { receiver, status: "friend" })
        return commit("removeRelationship", receiver)
      } catch (err) {}
    },
  },
  mutations: {
    updateRelationships: (state, relationships) => {
      state.relationships = relationships
    },
    pushToRelationships: (state, receiver) => {
      state.relationships = [
        ...state.relationships,
        {
          status: "pending",
          receiver,
        },
      ]
    },
    updateRelationship: (state, { receiver, status }) => {
      const relationshipIndex = findIndex(
        state.relationships,
        (relationship) =>
          relationship.receiver === receiver || relationship.sender === receiver
      )

      const relationship = state.relationships[relationshipIndex]

      relationship.status = status

      const stateRelationships = state.relationships

      state.relationships = [
        ...slice(stateRelationships, 0, relationshipIndex),
        relationship,
        ...slice(stateRelationships, relationshipIndex + 1),
      ]

      console.log(state.relationships)
    },
    resetAccount: (state) => (state = initialState()),
    removeRelationship: (state, receiver) => {
      state.relationships = filter(state.relationships, (relationship) => {
        return !(
          relationship.sender === receiver || relationship.receiver === receiver
        )
      })
    },
  },
}
