const RelationshipModel = require("../models/relationship.model")
const relationshipEvent = require("../helpers/relationship.event")

module.exports = async (req, res, next) => {
  const { accept } = req.body
  const { receiver } = req.params

  if (accept === undefined)
    return res.status(422).json({
      message_type: "acceptStatus.missing",
    })

  const relationship = await RelationshipModel.findOne({
    $and: [
      {
        status: "pending",
      },
      {
        $or: [
          {
            sender: req.user.username,
            receiver: receiver,
          },
          {
            sender: receiver,
            receiver: req.user.username,
          },
        ],
      },
    ],
  })

  if (!relationship)
    return res.status(404).json({
      message_type: "relationship.notFound",
    })

  if (accept) {
    await relationship.updateOne({
      status: "friend",
      updated_at: Date.now(),
    })
    relationshipEvent.emit("accepted-friend-request", {
      sender: req.user.username,
      receiver,
    })

    return res.status(200).send(true)
  }
  await relationship.deleteOne()

  relationshipEvent.emit("canceled-friend-request", {
    sender: req.user.username,
    receiver,
  })

  return res.status(200).send(true)
}
