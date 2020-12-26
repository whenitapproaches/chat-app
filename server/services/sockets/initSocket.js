const socketIO = require("socket.io")

const { authSocketMiddleware } = require("../../middlewares")

const chatBetweenTwoUsers = require("./chat/chatBetweenTwoUsers")

const relationshipsInit = require('./relationships')

const {
  removeUserSocketIds,
  updateUserSocketIds,
} = require("./socketIdsManager")

module.exports = (server) => {
  const io = socketIO(server)

  io.on("connection", (socket) => {
    const socketId = socket.id
    let socketUser
    socket.on("connectAuth", async ({ token }) => {
      let user
      try {
        user = await authSocketMiddleware(token)
        if (!user) return

        socketUser = user

        updateUserSocketIds(socketUser.username, socketId)

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

        socketUser = user

        updateUserSocketIds(socketUser.username, socketId)
        packet.socketUser = socketUser
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
        socketUser,
      })
    })
  })

  relationshipsInit(io)
}
