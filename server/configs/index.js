require("dotenv").config()

module.exports = {
  PORT: process.env.PORT || 3000,
  HOST: process.env.HOST || 'localhost',
  DATABASE_URI:
    process.env.DATABASE_URI || "mongodb://localhost:27017/chat-app",
  REFRESH_TOKEN_EXPIRATION_TIME:
    process.env.REFRESH_TOKEN_EXPIRATION_TIME || "1 hour",
  JWT_SECRET_KEY: process.env.SECRET_KEY || "chat-app",
  JWT_EXPIRATION_TIME: process.env.JWT_EXPIRATION_TIME || "50 minutes",
  PASSWORD_SALT_ROUNDS: process.env.PASSWORD_SALT_ROUNDS || 10
}
