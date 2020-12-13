const userSocketIds = {}
const { findIndex, pullAt, findKey } = require("lodash")

const updateUserSocketIds = (userId, socketId) => {
  if (!userSocketIds[userId]) return (userSocketIds[userId] = [socketId])
  if (userSocketIds[userId].includes(socketId)) return
  return userSocketIds[userId].push(socketId)
}

const removeUserSocketIds = (socketId) => {
  const userId = findKey(userSocketIds, (o) => o.includes(socketId))

  if (!userId) return

  const indexOfSocketId = findIndex(
    userSocketIds[userId],
    (o) => o === socketId
  )
  pullAt(userSocketIds[userId], indexOfSocketId)
}

const emitToUserId = ({ userId, io, eventName, data }) => {
  const socketIds = userSocketIds[userId]
  if (!socketIds) return
  socketIds.forEach((socketId) => {
    io.to(socketId).emit(eventName, data)
  })
}

function emitSentMessageToSender({ io, userId, data }) {
  emitToUserId({
    io,
    userId,
    data,
    eventName: "sent-message",
  })
}

function emitSentMessageToPartner({ io, userId, data }) {
  emitToUserId({
    io,
    userId,
    data,
    eventName: "received-message",
  })
}

module.exports = {
  emitToUserId,
  removeUserSocketIds,
  updateUserSocketIds,
  emitSentMessageToSender,
  emitSentMessageToPartner,
}
