const RelationshipModel = require("../models/relationship.model")
const UserModel = require("../models/user.model")

module.exports = async (req, res, next) => {
  const { receiver } = req.params

  let existingUser = await UserModel.findOne({
    username: receiver,
  })

  if (!existingUser)
    return res.status(404).json({
      message_type: "user.notFound",
    })

  const existingRelationship = await RelationshipModel.findOne({
    sender: req.user.username,
    receiver,
  })

  if (existingRelationship)
    return res.status(422).json({
      message_type: "relationship.existed",
    })

  await RelationshipModel.create({
    sender: req.user.username,
    receiver,
    status: "pending",
  })

  return res.status(200).send(true)
}
