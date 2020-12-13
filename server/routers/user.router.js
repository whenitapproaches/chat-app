const router = require("express").Router()

const path = `/api/user`

const {
  userLoginController,
  userLogoutController,
  userSignupController,
  userRefreshJWTController,
  userCheckUsernameAvailabilityController,
  userSearchController,
} = require("../controllers")

const { authMiddleware, refreshTokenMiddleware } = require("../middlewares")

router.post(`${path}/login`, userLoginController)

router.post(`${path}/signup`, userSignupController)

router.post(`${path}/jwt`, refreshTokenMiddleware, userRefreshJWTController)

router.post(`${path}/logout`, authMiddleware, userLogoutController)

router.get(`${path}/availability`, userCheckUsernameAvailabilityController)

router.get(`${path}`, refreshTokenMiddleware, userSearchController)

module.exports = router
