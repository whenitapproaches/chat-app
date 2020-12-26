const MessageModel = require("../models/message.model")
const UserModel = require("../models/user.model")

module.exports = async (req, res, next) => {
  const { partnerUsername } = req.params
  const { offset } = req.query

  if (!partnerUsername)
    return res.status(400).json({
      success: false,
      message: "Missing sender username.",
    })

  let partnerUser = await UserModel.findOne({
    username: partnerUsername,
  }).exec()

  if (!partnerUser)
    return res.status(404).json({
      success: false,
      message: "Partner username not found.",
    })

  let limitation = 20

  let messages = await MessageModel.find({
    $or: [
      {
        sender: req.user.username,
        receiver: partnerUsername,
      },
      {
        sender: partnerUsername,
        receiver: req.user.username,
      },
    ],
  })
    .sort({
      createdAt: -1,
    })
    .limit(limitation)
    .skip(+offset)
    .select("-__v")
    .exec()

  // await new Promise((res) => setTimeout(res, 200))

  return res.status(200).json({
    success: true,
    messages,
  })
}
