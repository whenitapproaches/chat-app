const RelationshipModel = require("../models/relationship.model")
const UserModel = require("../models/user.model")

module.exports = async (req, res, next) => {
  const relationships = await RelationshipModel.find({
    $or: [
      {
        sender: req.user.username,
      },
      {
        receiver: req.user.username,
      },
    ],
  }).select('-__v -_id')

  return res.status(200).json({
    relationships,
  })
}
