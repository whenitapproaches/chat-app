const UserModel = require('../models/user.model')
const ProfileModel = require('../models/profile.model')
const moment = require('moment')

module.exports = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken

  if(!refreshToken) return res.status(401).json({
    message: "Missing refresh token."
  })

  let user = await UserModel.findOne({
    'refreshToken.token': refreshToken
  })

  if(!user) return res.status(401).json({
    message: "Invalid refresh token."
  })

  const now = moment()

  const refreshTokenExpiredAt = moment(user.refreshToken.expiredAt)

  if(now.isAfter(refreshTokenExpiredAt)) return res.status(401).json({
    message: "Refresh token has expired."
  })

  req.user = user

  let profile = await ProfileModel.findOne({
    userId: user._id,
  }).exec()

  req.profile = profile

  next()
}