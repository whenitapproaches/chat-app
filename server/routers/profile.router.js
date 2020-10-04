const router = require("express").Router()

const path = `/api/profile`

const {
  profileFriendsController,
  profileAddFriendController,
  profileRespondFriendController,
  profileRemoveFriendController,
  profileUpdateAvatarController,
} = require("../controllers")

const { authMiddleware } = require("../middlewares")

router.get(`${path}/friends`, authMiddleware, profileFriendsController)
router.get(
  `${path}/friends/add/:partnerId`,
  authMiddleware,
  profileAddFriendController
)
router.get(
  `${path}/friends/respond/:partnerId`,
  authMiddleware,
  profileRespondFriendController
)
router.get(
  `${path}/friends/remove/:partnerId`,
  authMiddleware,
  profileRemoveFriendController
)
router.post(`${path}/avatar`, authMiddleware, profileUpdateAvatarController)

module.exports = router
