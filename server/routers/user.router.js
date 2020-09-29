const router = require("express").Router()

const path = `/api/user`

const {
  userLoginController,
  userLogoutController,
  userSignupController,
  userRefreshJWTController,
  userCheckUsernameAvailability
} = require("../controllers")

const { authMiddleware } = require("../middlewares")

router.post(`${path}/login`, userLoginController)

router.post(`${path}/signup`, userSignupController)

router.post(`${path}/jwt`, authMiddleware, userRefreshJWTController)

router.post(`${path}/logout`, authMiddleware, userLogoutController)

router.get(`${path}/availability`, userCheckUsernameAvailability)

module.exports = router
