const UserModel = require("../models/user.model")

module.exports = async (req, res, next) => {
  const user = req.user

  user.refreshToken.token = ''

  await user.save()

  return res.status(200).json({
    success: true,
    message: "Logged out."
  })
}
