const ProfileModel = require("../models/profile.model")

module.exports = async (req, res, next) => {
  let { _id: userId } = req.user

  profile = req.profile

  return res.status(200).json({
    success: true,
  })
}
