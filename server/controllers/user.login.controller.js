const passport = require("passport")

const { generateRefreshToken, generateJWT, JWTExpirationTimeInMs } = require("../utils")

module.exports = (req, res, next) => {
  passport.authenticate("local", async function (err, user, msg) {
    if (err) next(err)

    if (user) {
      let jwt = generateJWT({
        username: user.username,
        id: user._id,
      })

      let refreshTokenPayload = generateRefreshToken()
      if(req.body.remember) refreshTokenPayload.expiredAt = new Date(253402300000000)
      user.refreshToken.expiredAt = refreshTokenPayload.expiredAt
      user.refreshToken.token = refreshTokenPayload.token
      await user.save()

      res.cookie("refreshToken", refreshTokenPayload.token, {
        httpOnly: true,
        expires: refreshTokenPayload.expiredAt
      })

      return res.status(200).json({
        success: true,
        username: user.username,
        token: jwt,
        tokenExpiredIn: JWTExpirationTimeInMs()
      })
    }

    return res.status(422).json({
      success: false,
      ...msg,
    })
  })(req, res, next)
}
