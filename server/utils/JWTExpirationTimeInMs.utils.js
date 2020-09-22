const configs = require("../configs")
const moment = require("moment")
const JWT_EXPIRATION_TIME = configs.JWT_EXPIRATION_TIME

module.exports = function JWTExpirationTimeInMs() {
  let exp = moment.duration(...JWT_EXPIRATION_TIME.split(" ")).asMilliseconds()
  return exp
}
