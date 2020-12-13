const ImageModel = require("../models/image.model")
const configs = require('../configs')
const path = require('path')

module.exports = async (req, res, next) => {
  const { imageName } = req.params

  const image = await ImageModel.findOne({
    src: imageName,
    scoped: req.user.username,
  })

  if (!image) return res.status(404).send("Not found.")

  return res.status(200).sendFile(path.join(configs.APP_PATH, "assets/images", image.src))
}
