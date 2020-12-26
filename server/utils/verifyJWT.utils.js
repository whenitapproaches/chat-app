const configs = require("../configs")
const jwt = require("jsonwebtoken")

const JWT_SECRET_KEY = configs.JWT_SECRET_KEY

function verifyJWT(token) {
  return jwt.verify(token, JWT_SECRET_KEY)
}

module.exports = verifyJWT