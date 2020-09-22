const UserModel = require("../models/user.model")

module.exports = async (req, res, next) => {
  const username = req.body.username
  const password = req.body.password
  const confirmedPassword = req.body.confirmedPassword

  try {
    let existedUser = await UserModel.findOne({
      username
    })

    if (existedUser)
      return res.status(400).json({
        success: false,
        message: "This username has already been taken.",
      })

    await UserModel.create({
      username,
      password,
    })

    return res.status(200).json({
      success: true,
      message: "Registered successfully!",
    })
  } catch (err) {
    next(err)
  }
}
