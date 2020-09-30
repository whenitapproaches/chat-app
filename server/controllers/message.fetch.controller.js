const Message = require("../models/message.model")
const MessageModel = require("../models/message.model")

const faker = require("faker")
let a = faker.random.boolean()
MessageModel.create({
  senderId: a
    ? "TU4muq1UxxjURVVcOJIKvZQqjLC46y"
    : "39VAOeZP0u5rWG3U7jAu1MwtK8GuM-",
  content: faker.lorem.sentence(),
  receiverId: !a
    ? "TU4muq1UxxjURVVcOJIKvZQqjLC46y"
    : "39VAOeZP0u5rWG3U7jAu1MwtK8GuM-",
})

module.exports = async (req, res, next) => {
  const { partnerId } = req.params
  const { page } = req.query

  if (!partnerId)
    return res.status(400).json({
      success: false,
      message: "Missing sender ID.",
    })

  console.log(partnerId)

  const { _id: userId } = req.user

  let limitation = 5

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
  })
    .limit(limitation)
    .skip(page * limitation)
    .exec()

  return res.status(200).json(messages)
}
