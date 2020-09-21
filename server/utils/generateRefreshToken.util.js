function generatedRandomString(length) {
  var result = ""
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  var charactersLength = characters.length
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

const configs = require("../configs")
const moment = require("moment")
const REFRESH_TOKEN_EXPIRATION_TIME = configs.REFRESH_TOKEN_EXPIRATION_TIME

function generateRefreshToken() {
  let refreshTokenExpiredAt = moment
    .utc()
    .add(...REFRESH_TOKEN_EXPIRATION_TIME.split(" "))
    .toDate()
  return { token: generatedRandomString(30), expiredAt: refreshTokenExpiredAt }
}

module.exports = generateRefreshToken
