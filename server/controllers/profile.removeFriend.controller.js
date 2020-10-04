const ProfileModel = require("../models/profile.model")
const { find } = require("lodash")

module.exports = async (req, res, next) => {
  let { _id: userId } = req.user

  const { partnerId: partnerUserId } = req.params

  profile = req.profile

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

  if (!contact)
    return res.status(422).json({
      message: "This partner has not yet been your friend.",
      success: false,
    })

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
  await ProfileModel.updateOne(
    {
      userId,
    },
    {
      $pull: {
        friends: {
          userId: partnerUserId,
        },
      },
    }
  ).exec()

  return res.status(200).json({
    success: true,
  })
}
