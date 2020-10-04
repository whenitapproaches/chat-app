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
  friends: [
    {
      userId: {
        type: String,
        ref: "User",
      },
      isPending: {
        type: Boolean,
        default: true,
      },
    },
  ],
})

const Profile = mongoose.model("Profile", ProfileSchema)

module.exports = Profile
