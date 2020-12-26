import { ChatService, ImageService } from "@/services/api.service"
import { ref } from "vue"
import { nanoid } from "nanoid"
import { some, find, findIndex, slice } from "lodash"
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
    sortedByDateContacts: (state) => {
      return [...state.contacts].sort((a, b) => {
        return (
          moment(b.createdAt)
            .toDate()
            .getTime() -
          moment(a.createdAt)
            .toDate()
            .getTime()
        )
      })
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
      let conversation = state.conversations[partnerUsername] || {}
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
      if (message.media) {
        ImageService.upload(message.file, partnerUsername, fakeId)
      }
      SocketService.sendMessage({
        token,
        media: message.media ? true : false,
        receiver: message.receiver,
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

      const { sender } = message

      commit("unshiftToMessages", {
        username: sender,
        message: newMessage,
      })

      dispatch("updateContact", {
        username: sender,
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
        const response = await ChatService.fetchRecentMessages()
        const responseData = response.data
        const { messages } = responseData
        commit("updateContacts", messages)
      } catch (error) {
        console.log(error)
      }
    },
    fetchNewContacts: async ({ commit }, offset) => {
      try {
        const response = await ChatService.fetchRecentMessages()
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
          username,
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
        partnerUsername,
        _id: messageNewId,
      } = message

      commit("updateSentMessage", {
        messageClientId,
        createdAt,
        partnerUsername,
        media,
        messageNewId,
      })

      dispatch("updateContact", {
        username: partnerUsername,
        message: {
          content,
          createdAt,
        },
      })
    },
  },
  mutations: {
    pushToMessages: (state, { username, messages }) => {
      let conversation = state.conversations[username]
      let currentMessages = conversation.messages
      state.conversations[username] = {
        ...conversation,
        messages: [...currentMessages, ...messages],
      }
    },
    unshiftToMessages: (state, { username, message }) => {
      if (!state.conversations[username])
        state.conversations[username] = { messages: [], username }
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
      state.conversations[conversation.username] = conversation
    },
    updateIsFetchingNewMessages: (state, { username, status }) => {
      state.conversations[username].isFetchingNewMessages = status
    },
    updateSentMessage: (
      state,
      { createdAt, messageNewId, media, partnerUsername, messageClientId }
    ) => {
      const conversation = state.conversations[partnerUsername]

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
      let contactIndex = findIndex(
        state.contacts,
        (contact) => contact.partner === username
      )

      if (contactIndex < 0) {
        contactIndex = state.contacts.length
        state.contacts[contactIndex] = { partner: username }
      }

      
      const contact = state.contacts[contactIndex]
      
      console.log(contact)
      
      contact.content = message.content
      contact.createdAt = message.createdAt

      state.contacts = [
        ...slice(state.contacts, 0, contactIndex),
        contact,
        ...slice(state.contacts, contactIndex + 1),
      ]
    },
    resetChat: (state) => {
      const states = initialState()
      for (let key in states) {
        state[key] = states[key]
      }
    },
  },
}
