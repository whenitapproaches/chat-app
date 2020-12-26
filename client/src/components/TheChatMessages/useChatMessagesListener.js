import SocketService from "@/services/socket.service"
import { useStore } from "@/store"

export default function useChatMessageListener() {
  const store = useStore()

  const updateMessage = (message) => {
    store.dispatch("chat/updateMessage", message)
  }

  const receiveNewMessage = (message) => {
    store.dispatch("chat/receiveNewMessage", message)
  }

  SocketService.getSocket().off("sent-message")
  SocketService.getSocket().on("sent-message", (message) => {
    updateMessage(message)
  })
  SocketService.getSocket().on("received-message", ({ ...message }) => {
    receiveNewMessage({
      ...message,
    })
  })
}
