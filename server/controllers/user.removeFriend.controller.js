const RelationshipModel = require("../models/relationship.model")
const relationshipEvent = require("../helpers/relationship.event")

module.exports = async (req, res, next) => {
  const { receiver } = req.params

  const relationship = await RelationshipModel.findOne({
    $and: [
      {
        status: "friend",
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

  await relationship.deleteOne()

  relationshipEvent.emit("removed-friend", {
    sender: req.user.username,
    receiver,
  })

  return res.status(200).send(true)
}
