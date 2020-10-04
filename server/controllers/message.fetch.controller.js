const MessageModel = require("../models/message.model")

module.exports = async (req, res, next) => {
  const { partnerId } = req.params
  const { page } = req.query

  if (!partnerId)
    return res.status(400).json({
      success: false,
      message: "Missing sender ID.",
    })

  console.log(partnerId)

  const { _id: userId } = req.user

  let limitation = 5

  let messages = await MessageModel.find({
    $or: [
      {
        senderId: userId,
        receiverId: partnerId,
      },
      {
        senderId: partnerId,
        receiverId: userId,
      },
    ],
  })
    .limit(limitation)
    .skip(page * limitation)
    .exec()

  return res.status(200).json(messages)
}
