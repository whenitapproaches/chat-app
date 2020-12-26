const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshToken: {
    token: {
      type: String,
    },
    expiredAt: {
      type: Date,
    },
  },
}, {
  toJSON: {
    virtuals: true
  }
})

UserSchema.virtual('profile', {
  ref: 'Profile',
  localField: '_id',
  foreignField: 'userId',
  justOne: true,
})

const bcrypt = require("bcrypt")

UserSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password)
}

const configs = require("../configs")
const PASSWORD_SALT_ROUNDS = configs.PASSWORD_SALT_ROUNDS

UserSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next()

  const user = this

  bcrypt.hash(this.password, PASSWORD_SALT_ROUNDS, function (err, hash) {
    if (err) throw err
    user.password = hash
    return next()
  })
})

const User = mongoose.model("User", UserSchema)

module.exports = User
