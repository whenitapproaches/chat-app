const UserModel = require("../models/user.model")
const { verifyJWT } = require("../utils")

function getTokenInHeader(req) {
  let authorizationHeader = req.headers.authorization

  if (!authorizationHeader) return null

  let match = authorizationHeader.match(/Bearer (.*)/)
  return match ? match[1] : null
}

module.exports = async (req, res, next) => {
  const token = getTokenInHeader(req)

  if (!token)
    return res.status(401).json({
      message: "Missing token.",
    })

  let userPayload
  try {

    userPayload = verifyJWT(token)
  }
  catch(err) {
    return res.status(401).json({
      message: "Token has expired."
    })
  }

  let user = await UserModel.findById(userPayload.id)

  req.user = user

  next()
}
