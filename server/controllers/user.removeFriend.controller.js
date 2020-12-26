const RelationshipModel = require("../models/relationship.model")

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

  return res.status(200).send(true)
}
