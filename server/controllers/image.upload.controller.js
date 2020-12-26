const ImageModel = require("../models/image.model")
const imageUploadEvent = require("../helpers/imageUpload.event")

module.exports = async (req, res, next) => {
  const { messageClientId, receiverUsername } = req.params
  await ImageModel.create({
    name: req.originalName,
    src: req.name,
    scoped: [req.user.username, receiverUsername],
  })

  imageUploadEvent.emit(`uploaded${messageClientId}`, {
    imageName: req.name,
  })

  return res.status(200).send("OK")
}
