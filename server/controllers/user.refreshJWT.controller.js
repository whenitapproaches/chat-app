const { generateJWT } = require("../utils")

const UserModel = require("../models/user.model")
const moment = require('moment')
const JWTExpirationTimeInMs = require('../utils/JWTExpirationTimeInMs.utils')

module.exports = async (req, res, next) => {
  console.log(req.cookies)
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

  let jwt = generateJWT({
    username: user.username,
    id: user._id,
  })


  return res.status(200).json({
    success: true,
    username: user.username,
    token: jwt,
    tokenExpiredIn: JWTExpirationTimeInMs()
  })
}
