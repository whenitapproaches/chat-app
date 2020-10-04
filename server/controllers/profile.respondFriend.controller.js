const ProfileModel = require("../models/profile.model")
const { find } = require("lodash")

module.exports = async (req, res, next) => {
  let { _id: userId } = req.user

  const { partnerId: partnerUserId } = req.params

  const { accept } = req.query

  profile = req.profile

  if (!accept)
    return res.status(422).json({
      message: "Missing accept status.",
      success: false,
    })

  let partnerProfile = await ProfileModel.findOne({
    userId: partnerUserId,
  }).exec()

  if (!partnerProfile)
    return res.status(422).json({
      message: "Partner ID does not match any profile.",
      success: false,
    })

  let contact = find(
    partnerProfile.friends,
    (friend) => friend.userId === userId
  )

  console.log(contact)

  if (!contact)
    return res.status(422).json({
      message: "This partner has not yet added as friend.",
      success: false,
    })

  if (!contact.isPending)
    return res.status(422).json({
      message: "This partner has already been your friend.",
      success: false,
    })

  if (+accept) {
    await ProfileModel.updateOne(
      {
        userId,
      },
      {
        $push: {
          friends: {
            userId: partnerUserId,
            isPending: false,
          },
        },
      }
    ).exec()

    await ProfileModel.updateOne(
      {
        userId: partnerUserId,
        "friends.userId": userId,
      },
      {
        $set: {
          "friends.$.isPending": false,
        },
      }
    ).exec()
  } else {
    await ProfileModel.updateOne(
      {
        userId: partnerUserId,
      },
      {
        $pull: {
          friends: {
            userId,
          },
        },
      }
    ).exec()
  }

  return res.status(200).json({
    success: true,
  })
}
