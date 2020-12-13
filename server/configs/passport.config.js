const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("../models/user.model")

passport.use(
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    function (username, password, done) {
      User.findOne({
        username: username,
      })
        .then(async (user) => {
          // No user found
          if (!user)
            return done(null, false, {
              error: {
                message: "Please check again your username or password",
              },
            })
          // Matching password
          let isValidPassword = await user.verifyPassword(password)
          if (!isValidPassword)
            return done(null, false, {
              error: {
                message: "Please check again your username or password",
              },
            })
          // All OK
          return done(null, user)
        })
        .catch(done)
    }
  )
)
