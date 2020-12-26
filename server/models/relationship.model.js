const mongoose = require("mongoose")

const Schema = mongoose.Schema

const RelationshipSchema = new Schema({
  sender: {
    type: String,
    required: true,
  },
  receiver: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["friend", "pending"],
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
})

const Relationship = mongoose.model("Relationship", RelationshipSchema)

module.exports = Relationship
