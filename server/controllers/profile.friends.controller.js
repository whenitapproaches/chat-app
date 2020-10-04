const ProfileModel = require("../models/profile.model")
const { filter, mapKeys } = require("lodash")

module.exports = async (req, res, next) => {
  profile = req.profile

  let population = await ProfileModel.findById(profile._id).populate({
    path: 'friends.userId',
    select: '_id username'
  }).select('friends -_id').exec()

  let friends = population.friends

  let isAcceptedFriends = filter(friends, (friend) => !friend.isPending)

  return res.status(200).json({
    friends: isAcceptedFriends,
    success: true,
  })
}
