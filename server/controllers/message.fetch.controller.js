const MessageModel = require("../models/message.model")
const UserModel = require("../models/user.model")
const ProfileModel = require("../models/profile.model")

// MessageModel.create({
//   senderId: "CQ4H1xa24Y5iIvyrpDTO1eNgduCxfK",
//   receiverId: "HcG01KYBa57zcRs9X3bnI1LQ0BiYs8",
//   content: "Hello"
// })

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

  if(!partnerUser) return res.status(404).json({
    success: false,
    message: "Partner username not found."
  })

  let partnerId = partnerUser._id

  const { _id: userId } = req.user

  let limitation = 10

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
    .sort({
      createdAt: -1
    })
    .limit(limitation)
    .skip(+offset)
    .select("-__v")
    .exec()

  const partnerProfile = await ProfileModel.findOne({
    userId: partnerId
  }).select('-userId -friends -__v').exec()

  await new Promise((res) => setTimeout(res, 200))

  return res.status(200).json({
    success: true,
    messages,
    partnerProfile,
    partnerUser: {
      _id: partnerId
    }
  })
}
