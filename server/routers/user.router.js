const router = require("express").Router()

const path = `/api/user`

const {
  userLoginController,
  userLogoutController,
  userSignupController,
  userRefreshJWTController,
  userCheckUsernameAvailabilityController,
  userSearchController,
  userAddFriendController,
  userFriendsController,
  userRemoveFriendController,
  userRespondFriendController,
} = require("../controllers")

const { authMiddleware, refreshTokenMiddleware } = require("../middlewares")

router.post(`${path}/login`, userLoginController)

router.post(`${path}/signup`, userSignupController)

router.post(`${path}/jwt`, refreshTokenMiddleware, userRefreshJWTController)

router.post(`${path}/logout`, authMiddleware, userLogoutController)

router.get(`${path}/availability`, userCheckUsernameAvailabilityController)

router.get(`${path}`, refreshTokenMiddleware, userSearchController)

router.get(`${path}/friend`, authMiddleware, userFriendsController)

router.post(
  `${path}/friend/add/:receiver`,
  authMiddleware,
  userAddFriendController
)

router.post(
  `${path}/friend/remove/:receiver`,
  authMiddleware,
  userRemoveFriendController
)

router.post(
  `${path}/friend/respond/:receiver`,
  authMiddleware,
  userRespondFriendController
)

module.exports = router
