const router = require("express").Router()

const path = `/api/user`

const { userLoginController, userSignupController, userRefreshJWTController } = require("../controllers")

router.post(`${path}/login`, userLoginController)

router.post(`${path}/signup`, userSignupController)

router.post(`${path}/jwt`, userRefreshJWTController)

module.exports = router
