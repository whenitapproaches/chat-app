const { generateJWT } = require("../utils")

const UserModel = require("../models/user.model")
const moment = require('moment')
const JWTExpirationTimeInMs = require('../utils/JWTExpirationTimeInMs.utils')

module.exports = async (req, res, next) => {
  const user = req.user

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
