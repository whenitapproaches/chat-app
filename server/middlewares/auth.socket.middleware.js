const UserModel = require("../models/user.model")
const { verifyJWT } = require("../utils")

module.exports = async (token) => {
  if (!token) return

  let userPayload
  try {
    userPayload = verifyJWT(token)
  }
  catch(err) {
    return
  }

  let user = await UserModel.findById(userPayload.id)

  return {
    username: user.username,
    _id: user._id,
  }
}
