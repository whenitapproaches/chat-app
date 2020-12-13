const { generateJWT, JWTExpirationTimeInMs } = require("../utils")

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
    tokenExpiredIn: JWTExpirationTimeInMs(),
    _id: user._id,
  })
}
