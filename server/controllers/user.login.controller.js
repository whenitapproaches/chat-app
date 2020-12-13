const passport = require("passport")

const {
  generateRefreshToken,
  generateJWT,
  JWTExpirationTimeInMs,
} = require("../utils")

const moment = require("moment")

module.exports = (req, res, next) => {
  passport.authenticate("local", async function (err, user, msg) {
    if (err) next(err)

    if (user) {
      let jwt = generateJWT({
        username: user.username,
        id: user._id,
      })

      let refreshToken = user.refreshToken.token
      let refreshTokenExpiredAt = user.refreshToken.expiredAt

      if (!refreshToken || isRefreshTokenExpired(refreshTokenExpiredAt)) {
        let refreshTokenPayload = generateRefreshToken()
        if (req.body.remember)
          refreshTokenPayload.expiredAt = new Date(253402300000000)
        user.refreshToken.expiredAt = refreshTokenPayload.expiredAt
        user.refreshToken.token = refreshTokenPayload.token
        await user.save()
        refreshToken = refreshTokenPayload.token
        refreshTokenExpiredAt = refreshTokenPayload.expiredAt
      }

      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        expires: refreshTokenExpiredAt,
      })

      return res.status(200).json({
        success: true,
        username: user.username,
        token: jwt,
        tokenExpiredIn: JWTExpirationTimeInMs(),
        _id: user._id,
      })
    }

    return res.status(422).json({
      success: false,
      ...msg,
    })
  })(req, res, next)
}

function isRefreshTokenExpired(refreshTokenExpiredAt) {
  return moment(refreshTokenExpiredAt).isBefore(moment())
}
