const router = require("express").Router()

const path = `/api/message`

const { messageFetchController, messageFetchRecentController } = require("../controllers")

const { authMiddleware } = require("../middlewares")

router.get(`${path}/to/:partnerUsername`, authMiddleware, messageFetchController)

router.get(`${path}/recent`, authMiddleware, messageFetchRecentController)

module.exports = router
