const router = require("express").Router()

const path = `/api/image`

const multer = require("multer")

const configs = require("../configs")

const pathModule = require("path")

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, pathModule.join(configs.APP_PATH, "assets/images"))
  },
  filename: function (req, file, cb) {
    const matches = file.originalname.matchAll(/.([A-z]+)$/g)
    const extension = [...matches][0][0]
    const filename =
      file.fieldname + "-" + req.user.username + "-" + Date.now() + extension
    req.name = filename
    req.originalName = file.originalname
    cb(null, filename)
  },
})

var upload = multer({ storage: storage })

const { imageUploadController, imageReadController } = require("../controllers")

const { authMiddleware } = require("../middlewares")

const receiverMiddleware = (req, res, next) => {
  const { receiverUsername, messageClientId } = req.params

  if (!receiverUsername)
    return res.status(400).json({
      message: "Missing receiver username.",
    })
  if(!messageClientId) return res.status(400).json({
    message: "Missing messageClientId"
  })

  req.messageClientId = messageClientId

  next()
}

router.post(
  `${path}/:receiverUsername/:messageClientId`,
  [authMiddleware, receiverMiddleware, upload.single("image")],
  imageUploadController
)

router.get(`${path}/:imageName`, [authMiddleware], imageReadController)

module.exports = router
