const UserModel = require('../models/user.model')

module.exports = async (req, res, next) => {
  const user = req.user

  if(!req.query.username) {
    return res.status(400).json({
      success: false,
      message: "Missing username query."
    })
  }

  const users = await UserModel.find({
    $and: [
      {
        username: {
          $regex: req.query.username,
          $options: "gi"
        },
      },
      {
        username: {
          $ne: req.user.username
        }
      }
    ]
  }).select('username').lean()

  return res.status(200).json({
    success: true,
    users
  })
}
