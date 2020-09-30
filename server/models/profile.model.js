const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ProfileSchema = new Schema({
  userId: {
    type: String,
  },
  displayName: {
    type: String,
  },
  gender: {
    type: String,
  },
  dateOfBirth: {
    type: Date,
  },
  listFriends: [
    {
      userId: {
        type: String,
      },
    },
  ],
})

const Profile = mongoose.model("Profile", ProfileSchema)

module.exports = Profile
