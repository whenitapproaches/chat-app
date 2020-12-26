const mongoose = require("mongoose")

const Schema = mongoose.Schema

const ImageSchema = new Schema({
  src: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  scoped: {
    type: Array,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Image = mongoose.model("Image", ImageSchema)

module.exports = Image
