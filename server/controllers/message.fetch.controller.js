const Message = require("../models/message.model")
const MessageModel = require("../models/message.model")

const faker = require("faker")
let a = faker.random.boolean()
MessageModel.create({
  senderId: a ? "TU4muq1UxxjURVVcOJIKvZQqjLC46y" : "39VAOeZP0u5rWG3U7jAu1MwtK8GuM-",
  content: faker.lorem.sentence(),
  receiverId: !a ? "TU4muq1UxxjURVVcOJIKvZQqjLC46y" : "39VAOeZP0u5rWG3U7jAu1MwtK8GuM-",
})

module.exports = async (req, res, next) => {
  const { partnerId } = req.params

  if (!partnerId)
    return res.status(400).json({
      success: false,
      message: "Missing sender ID.",
    })

  console.log(partnerId)

  const { _id: userId } = req.user

  let messages = await MessageModel.find({
    $or: [
      {
        senderId: userId,
        receiverId: partnerId,
      },
      {
        senderId: partnerId,
        receiverId: userId,
      },
    ],
  }).limit(5).exec()

  
  console.log(messages)
  res.json(messages)
}
