const configs = require("../configs")
const moment = require("moment")
const jwt = require("jsonwebtoken")

const JWT_SECRET_KEY = configs.JWT_SECRET_KEY
const JWT_EXPIRATION_TIME = configs.JWT_EXPIRATION_TIME

function generateJWT(payload) {
  let exp = moment
    .utc()
    .add(...JWT_EXPIRATION_TIME.split(" "))
    .unix()
  return jwt.sign(
    {
      ...payload,
      exp: exp,
    },
    JWT_SECRET_KEY
  )
}

module.exports = generateJWT