const mongoose = require("mongoose")

const Schema = mongoose.Schema

const MessageSchema = new Schema({
  senderId: {
    type: String,
    required: true
  },
  content: {
    type: String,
  },
  media: {
    type: String,
  },
  receiverId: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
})

const Message = mongoose.model("Message", MessageSchema)

module.exports = Message
