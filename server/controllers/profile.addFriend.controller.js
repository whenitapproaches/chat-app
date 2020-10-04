const ProfileModel = require("../models/profile.model")
const { some } = require("lodash")

module.exports = async (req, res, next) => {
  let { _id: userId } = req.user

  const { partnerId: partnerUserId } = req.params

  profile = req.profile

  if (partnerUserId === userId)
    return res.status(422).json({
      message: "You cannot add yourself as a friend.",
      success: false,
    })

  let hasAlreadyAdded = some(
    profile.friends,
    (friend) => friend.userId === partnerUserId
  )

  if (hasAlreadyAdded)
    return res.status(422).json({
      message: "This partner has already been added as friend.",
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

  await ProfileModel.updateOne(
    {
      userId,
    },
    {
      $push: {
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
