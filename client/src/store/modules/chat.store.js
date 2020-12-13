// import { reactive, ref, watchEffect } from "vue"
// import { ChatService } from "@/services/api.service"
// import { nanoid } from "nanoid"
// import { find, some } from "lodash"

// export default () => {
//   const conversations = reactive({})
//   const recentContacts = ref([])
//   const currentPartnerUsername = ref("")

//   const findByUserIdAndUpdateRecentContacts = (userId, payload) => {
//     const contact = find(recentContacts, {
//       "partner._id": userId,
//     })
//   }

//   const newContact = (payload) => {
//     recentContacts.value.unshift(payload)
//   }

//   const fetchRecentContacts = async ({ offset }) => {
//     const response = await ChatService.fetchRecentMessages({ offset })
//     const responseData = response.data
//     recentContacts.value = responseData.messages
//   }

//   const updateCurrentPartnerByRoute = async (username) => {
//     if (conversations[username]) return
//     currentPartnerUsername.value = username // update current partner username
//     newConversation(username)
//   }

//   const newConversation = async (username) => {
//     const response = await ChatService.fetchMessages({
//       partnerUsername: username,
//       offset: 0,
//     })
//     const responseData = response.data
//     conversations[username] = {
//       user: {
//         username,
//         _id: responseData.partnerUser._id,
//       },
//       profile: responseData.partnerProfile,
//       messages: responseData.messages,
//     }
//   }

//   const fetchNewMessages = async (username) => {
//     let conversation = conversations[username]
//     const response = await ChatService.fetchMessages({
//       partnerUsername: username,
//       offset: conversation.messages.length,
//     })
//     const responseData = response.data
//     if (!responseData.messages.length) {
//       conversation.isFullLoaded = true
//       return
//     }
//     conversation.messages = [...conversation.messages, ...responseData.messages]
//   }

// const createNewMessage = (message) => {
//   let fakeId
//   const conversation = conversations[currentPartnerUsername.value]
//   let isIdDuplicated = true
//   while (isIdDuplicated) {
//     fakeId = nanoid()

//     isIdDuplicated = some(conversation.messages, (o) => o._id === fakeId)
//   }

//   const newMessage = {
//     _id: fakeId,
//     isPending: true,
//     ...message,
//   }

//   conversation.messages = [newMessage, ...conversation.messages]

//   return fakeId
// }

//   const updateMessage = (message) => {
//     const { messageClientId } = message

//     const conversation = find(
//       conversations,
//       (o) => o.user._id === message.partnerUserId
//     )

//     const { messages } = conversation

//     const toBeUpdatedMessage = find(messages, (msg) => msg._id === messageClientId)

//     toBeUpdatedMessage.created_at = message.createdAt

//     toBeUpdatedMessage.isPending = false
//   }

//   return {
//     updateCurrentPartnerByRoute,
//     findByUserIdAndUpdateRecentContacts,
//     newContact,
//     fetchRecentContacts,
//     fetchNewMessages,
//     createNewMessage,
//     recentContacts,
//     currentPartnerUsername,
//     conversations,
//     updateMessage
//   }
// }

import { ChatService, ImageService } from "@/services/api.service"
import { ref } from "vue"
import { nanoid } from "nanoid"
import { some, findKey, find } from "lodash"
import SocketService from "@/services/socket.service"
import moment from "moment"

const initialState = () => ({
  conversations: {},
  currentPartner: {
    username: "",
  },
  contacts: [],
})

export default {
  namespaced: true,
  state: initialState(),
  getters: {
    currentPartnerUsername: (state) => state.currentPartner.username,
    currentPartnerConversation: (state) => {
      let conversation = state.conversations[state.currentPartner.username]
      if (!conversation) return null
      return conversation
    },
  },
  actions: {
    fetchRecentConversations: async ({ commit }) => {
      try {
        const response = await ChatService.fetchRecentMessages()
        const responseData = response.data
        const { messages } = responseData
        commit("setConversations", messages)
      } catch (error) {
        console.log(error)
      }
    },
    createNewMessage: ({ commit, state, rootState }, message) => {
      let fakeId
      let partnerUsername = state.currentPartner.username
      const conversation = state.conversations[partnerUsername]
      let isIdDuplicated = true
      while (isIdDuplicated) {
        fakeId = nanoid()
        isIdDuplicated = some(conversation.messages, (o) => o._id === fakeId)
      }
      const newMessage = {
        _id: fakeId,
        ...message,
        isPending: true,
      }
      const currentUser = rootState.user.user
      const { token } = currentUser
      if(message.media) {
        ImageService.upload(message.file, partnerUsername, fakeId)
      }
      SocketService.sendMessage({
        token,
        media: message.media ? true : false,
        to: message.receiverId,
        content: message.content,
        messageClientId: fakeId,
      })
      commit("unshiftToMessages", {
        username: partnerUsername,
        message: newMessage,
      })
    },
    receiveNewMessage: ({ commit, dispatch, state }, message) => {
      const newMessage = {
        ...message,
        isPending: false,
      }

      const { senderId } = message

      const receiverUsername = findKey(
        state.conversations,
        (o) => o.user._id === senderId
      )

      commit("unshiftToMessages", {
        username: receiverUsername,
        message: newMessage,
      })

      dispatch("updateContact", {
        username: receiverUsername,
        message: newMessage,
      })
    },
    updateContact: ({ commit }, { username, message }) => {
      commit("updateContact", { username, message })
    },
    updateCurrentPartnerUsername: ({ commit, state, dispatch }, username) => {
      if (!state.conversations[username])
        dispatch("fetchMessages", { username })
      commit("updateCurrentPartnerUsername", username)
    },
    fetchContacts: async ({ commit }) => {
      try {
        const response = await ChatService.fetchRecentMessages({ offset: 0 })
        const responseData = response.data
        const { messages } = responseData
        commit("updateContacts", messages)
      } catch (error) {
        console.log(error)
      }
    },
    fetchNewContacts: async ({ commit }, offset) => {
      try {
        const response = await ChatService.fetchRecentMessages({ offset })
        const responseData = response.data
        const { messages } = responseData
        commit("pushToContacts", messages)
      } catch (error) {
        console.log(error)
      }
    },
    fetchMessages: async ({ commit }, { username }) => {
      try {
        const response = await ChatService.fetchMessages({
          partnerUsername: username,
          offset: 0,
        })
        const responseData = response.data
        commit("newConversation", {
          user: {
            username,
            _id: responseData.partnerUser._id,
          },
          profile: responseData.partnerProfile,
          messages: ref(responseData.messages),
        })
      } catch (error) {}
    },
    fetchNewMessages: async ({ commit, state }, { username }) => {
      let conversation = state.conversations[username]
      try {
        const response = await ChatService.fetchMessages({
          partnerUsername: username,
          offset: conversation.messages.length,
        })
        const responseData = response.data
        const { messages } = responseData
        if (!messages.length) {
          conversation.isFullLoaded = true
          return
        }
        commit("pushToMessages", {
          username,
          messages,
        })
      } catch (err) {
        return
      }
    },
    updateIsFetchingNewMessages: async ({ commit }, { username, status }) => {
      commit("updateIsFetchingNewMessages", { username, status })
    },
    updateMessage: ({ commit, dispatch, state }, message) => {
      const {
        messageClientId,
        createdAt,
        content,
        media,
        partnerUserId: receiverUserId,
        _id: messageNewId,
      } = message

      commit("updateSentMessage", {
        messageClientId,
        createdAt,
        receiverUserId,
        media,
        messageNewId,
      })

      const receiverUsername = findKey(
        state.conversations,
        (o) => o.user._id === receiverUserId
      )

      dispatch("updateContact", {
        username: receiverUsername,
        message: {
          content, createdAt
        },
      })
    },
  },
  mutations: {
    pushToMessages: (state, { username, messages }) => {
      let currentMessages = state.conversations[username].messages
      state.conversations[username].messages = [...currentMessages, ...messages]
    },
    unshiftToMessages: (state, { username, message }) => {
      let currentMessages = state.conversations[username].messages
      state.conversations[username].messages = [
        ...[message],
        ...currentMessages,
      ]
    },
    setConversations: (state, conversations) =>
      (state.conversations = conversations),
    updateCurrentPartnerUsername: (state, username) =>
      (state.currentPartner.username = username),
    pushToContacts: (state, contacts) =>
      (state.contacts = [...state.contacts, ...contacts]),
    updateContacts: (state, contacts) => (state.contacts = contacts),
    newConversation: (state, conversation) => {
      state.conversations[conversation.user.username] = conversation
    },
    updateIsFetchingNewMessages: (state, { username, status }) => {
      state.conversations[username].isFetchingNewMessages = status
    },
    updateSentMessage: (
      state,
      { createdAt, messageNewId, media, receiverUserId, messageClientId }
    ) => {
      const receiverUsername = findKey(
        state.conversations,
        (o) => o.user._id === receiverUserId
      )

      const conversation = state.conversations[receiverUsername]

      const { messages } = conversation

      const toBeUpdatedMessage = find(
        messages,
        (msg) => msg._id === messageClientId
      )

      toBeUpdatedMessage.media = media
      toBeUpdatedMessage.created_at = moment(createdAt)
      toBeUpdatedMessage._id = messageNewId

      toBeUpdatedMessage.isPending = false
    },
    updateContact: (state, { username, message }) => {
      let contact = find(state.contacts, (o) => (o.partner.username = username))
      const { content, createdAt } = message

      if (!contact) {
        return (state.contacts = [
          ...state.contacts,
          {
            content,
            createdAt,
            partner: {
              username,
            },
          },
        ])
      }

      contact.content = content
      contact.createdAt = createdAt
    },
    resetChat: (state) => {
      const states = initialState()
      for (let key in states) {
        state[key] = states[key]
      }
    },
  },
}
