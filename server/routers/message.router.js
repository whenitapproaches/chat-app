const router = require("express").Router()

const path = `/api/message`

const { messageFetchController } = require("../controllers")

const { authMiddleware } = require("../middlewares")

router.get(`${path}/fetch/:partnerId`, authMiddleware, messageFetchController)

module.exports = router
