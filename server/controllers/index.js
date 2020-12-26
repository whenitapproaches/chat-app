const userLoginController = require("./user.login.controller")
const userSignupController = require("./user.signup.controller")
const userRefreshJWTController = require("./user.refreshJWT.controller")
const userLogoutController = require("./user.logout.controller")
const userCheckUsernameAvailabilityController = require("./user.checkUsernameAvailability.controller")
const userSearchController = require("./user.search.controller")
const messageFetchController = require("./message.fetch.controller")
const messageFetchRecentController = require("./message.fetchRecent.controller")
const imageUploadController = require("./image.upload.controller")
const imageReadController = require("./image.read.controller")
const userFriendsController = require("./user.friends.controller")
const userAddFriendController = require("./user.addFriend.controller")
const userRemoveFriendController = require("./user.removeFriend.controller")
const userRespondFriendController = require("./user.respondFriend.controller")

module.exports = {
  userLoginController,
  userSignupController,
  userRefreshJWTController,
  userLogoutController,
  userCheckUsernameAvailabilityController,
  userSearchController,
  userFriendsController,
  userAddFriendController,
  userRemoveFriendController,
  userRespondFriendController,
  messageFetchController,
  messageFetchRecentController,
  imageUploadController,
  imageReadController,
}
