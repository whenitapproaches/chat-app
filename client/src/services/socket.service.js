import io from "socket.io-client"

import configs from "@/configs"

const DEVELOPMENT = true

const host = DEVELOPMENT ? `${configs.HOST}` : ""

let socket

export default {
  init() {
    socket = io(host)
  },
  getSocket() {
    return socket
  },
  connectAuth({ token }) {
    socket.emit("connectAuth", { token })
  },
  sendMessage({ token, receiver, media, content, messageClientId }) {
    socket.emit("send-message", {
      token,
      receiver,
      media,
      content,
      messageClientId,
    })
  },
  connect() {
    socket.connect()
  },
  disconnect() {
    if (!socket) return
    socket.disconnect()
  },
}
