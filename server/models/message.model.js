const mongoose = require("mongoose")

const Schema = mongoose.Schema

const moment = require("moment")

const MessageSchema = new Schema({
  sender: {
    type: String,
    required: true,
  },
  content: {
    type: String,
  },
  media: {
    type: String,
    ref: "Image"
  },
  receiver: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Message = mongoose.model("Message", MessageSchema)

module.exports = Message
