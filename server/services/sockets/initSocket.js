const socketIO = require("socket.io")

const { authSocketMiddleware } = require("../../middlewares")

const chatBetweenTwoUsers = require("./chat/chatBetweenTwoUsers")

const {
  removeUserSocketIds,
  updateUserSocketIds,
} = require("./socketIdsManager")

module.exports = (server) => {
  const io = socketIO(server)

  io.on("connection", (socket) => {
    const socketId = socket.id
    let socketUserId
    socket.on("connectAuth", async ({ token }) => {
      let user
      try {
        user = await authSocketMiddleware(token)
        if (!user) return

        socketUserId = user._id

        updateUserSocketIds(socketUserId, socketId)

        next()
      } catch (err) {
        return
      }
    })
    socket.use(async (packet, next) => {
      const data = packet[1]
      let user
      try {
        user = await authSocketMiddleware(data.token)
        if (!user) return
        data.from = user

        socketUserId = user._id

        updateUserSocketIds(socketUserId, socketId)
        packet.socketUserId = socketUserId
        next()
      } catch (err) {
        return
      }
    })
    socket.on("disconnect", (reason) => {
      removeUserSocketIds(socketId)
    })
    socket.on("send-message", async (data) => {
      chatBetweenTwoUsers({
        data,
        io,
        socketUserId
      })
    })
  })
}
