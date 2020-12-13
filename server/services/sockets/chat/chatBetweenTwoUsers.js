const {
  emitSentMessageToSender,
  emitSentMessageToPartner,
} = require("../socketIdsManager")
const MessageModel = require("../../../models/message.model")
const imageUploadEvent = require("../../../helpers/imageUpload.event")

module.exports = async ({
  data: { to: toUserId, content, media, messageClientId },
  io,
  socketUserId,
}) => {
  let fromUserId = socketUserId

  // Create a new message object
  const messageData = {
    content,
    senderId: fromUserId,
    receiverId: toUserId,
  }

  if (media) {
    const hasUploaded = await Promise.race([
      new Promise((resolve) => {
        imageUploadEvent.once(`uploaded${messageClientId}`, ({ imageName }) => {
          messageData.media = imageName
          setTimeout(() => resolve(true), 2500)
        })
      }),
      new Promise((resolve) => setTimeout(() => resolve(false), 5000)),
    ])
    if (!hasUploaded) return console.log("error")
  }

  const message = await MessageModel.create(messageData)

  emitSentMessageToSender({
    io,
    userId: fromUserId,
    data: {
      _id: message._id,
      messageClientId,
      content,
      media: message.media,
      partnerUserId: toUserId,
      createdAt: message.createdAt,
    },
  })

  emitSentMessageToPartner({
    io,
    userId: toUserId,
    data: { ...messageData, createdAt: message.createdAt, _id: message._id },
  })
}
