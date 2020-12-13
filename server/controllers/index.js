const userLoginController = require("./user.login.controller")
const userSignupController = require("./user.signup.controller")
const userRefreshJWTController = require("./user.refreshJWT.controller")
const userLogoutController = require("./user.logout.controller")
const userCheckUsernameAvailabilityController = require("./user.checkUsernameAvailability.controller")
const messageFetchController = require("./message.fetch.controller")
const messageFetchRecentController = require("./message.fetchRecent.controller")
const profileFriendsController = require("./profile.friends.controller")
const profileAddFriendController = require("./profile.addFriend.controller")
const profileRespondFriendController = require("./profile.respondFriend.controller")
const profileRemoveFriendController = require("./profile.removeFriend.controller")
const profileUpdateAvatarController = require("./profile.updateAvatar.controller")
const imageUploadController = require('./image.upload.controller')
const imageReadController = require('./image.read.controller')
const userSearchController = require('./user.search.controller')

module.exports = {
  userLoginController,
  userSignupController,
  userRefreshJWTController,
  userLogoutController,
  userCheckUsernameAvailabilityController,
  userSearchController,
  messageFetchController,
  messageFetchRecentController,
  profileFriendsController,
  profileAddFriendController,
  profileRespondFriendController,
  profileRemoveFriendController,
  profileUpdateAvatarController,
  imageUploadController,
  imageReadController
}
