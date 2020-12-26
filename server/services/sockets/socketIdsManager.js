const userSocketIds = {}
const { findIndex, pullAt, findKey } = require("lodash")

const updateUserSocketIds = (user, socketId) => {
  if (!userSocketIds[user]) return (userSocketIds[user] = [socketId])
  if (userSocketIds[user].includes(socketId)) return
  return userSocketIds[user].push(socketId)
}

const removeUserSocketIds = (socketId) => {
  const user = findKey(userSocketIds, (o) => o.includes(socketId))

  if (!user) return

  const indexOfSocketId = findIndex(
    userSocketIds[user],
    (o) => o === socketId
  )
  pullAt(userSocketIds[user], indexOfSocketId)
}

const emitToUser = ({ user, io, eventName, data }) => {
  const socketIds = userSocketIds[user]
  if (!socketIds) return
  socketIds.forEach((socketId) => {
    io.to(socketId).emit(eventName, data)
  })
}

function emitSentMessageToSender({ io, user, data }) {
  emitToUser({
    io,
    user,
    data,
    eventName: "sent-message",
  })
}

function emitSentMessageToPartner({ io, user, data }) {
  emitToUser({
    io,
    user,
    data,
    eventName: "received-message",
  })
}

module.exports = {
  emitToUser,
  removeUserSocketIds,
  updateUserSocketIds,
  emitSentMessageToSender,
  emitSentMessageToPartner,
}
