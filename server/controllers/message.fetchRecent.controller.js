const MessageModel = require("../models/message.model")
const { groupBy, take } = require("lodash")

module.exports = async (req, res, next) => {
  let messages = await MessageModel.find({
    $or: [
      {
        sender: req.user.username,
      },
      {
        receiver: req.user.username,
      },
    ],
  })
    .sort({ createdAt: -1 })
    .select("-__v -_id")

  const groupedByMessages = groupBy(messages, (message) =>
    message.sender === req.user.username ? message.receiver : message.sender
  )

  for (let partner in groupedByMessages) {
    let message = groupedByMessages[partner][0]
    groupedByMessages[partner] = {
      content: message.content,
      createdAt: message.createdAt,
      partner:
        message.sender === req.user.username
          ? message.receiver
          : message.sender,
    }
  }

  return res.status(200).json({
    success: true,
    messages: Object.values(groupedByMessages),
  })
}
