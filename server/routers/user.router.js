const router = require("express").Router()

const path = `/api/user`

const { userLoginController, userSignupController } = require("../controllers")

router.post(`${path}/login`, userLoginController)

router.post(`${path}/signup`, userSignupController)

module.exports = router
