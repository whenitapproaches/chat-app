const e = require("express")
const UserModel = require("../models/user.model")

module.exports = async (req, res, next) => {
  let existingUser = await UserModel.findOne({
    username: req.query.username
  })

  if(existingUser) return res.status(200).send(false)

  return res.status(200).send(true)
}
