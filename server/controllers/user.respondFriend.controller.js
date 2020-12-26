const { raw } = require("express")
const RelationshipModel = require("../models/relationship.model")

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
    return res.status(200).send(true)
  }
  await relationship.deleteOne()

  return res.status(200).send(true)
}
