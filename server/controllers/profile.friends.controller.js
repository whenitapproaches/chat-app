const ProfileModel = require("../models/profile.model")

module.exports = async (req, res, next) => {
  profile = req.profile

  let relationships = await ProfileModel.aggregate([
    {
      $match: {
        "friends.userId": req.user._id,
      },
    },
    {
      $project: {
        friends: {
          $filter: {
            input: "$friends",
            as: "friend",
            cond: {
              $eq: ["$$friend.userId", req.user._id],
            },
          },
        },
        userId: 1
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "sender",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "friends.userId",
        foreignField: "_id",
        as: "receiver",
      },
    },
    {
      $project: {
        "sender.username": 1,
        "sender._id": 1,
        "receiver.username": 1,
        "receiver._id": 1,
        isPending: "$friends.isPending",
        _id: 0,
      },
    },
    {
      $unwind: "$sender",
    },
    {
      $unwind: "$isPending",
    },
    {
      $unwind: "$receiver",
    },
  ]).exec()

  let ownRelationships = await ProfileModel.aggregate([
    {
      $match: {
        userId: req.user._id,
      },
    },
    {
      $project: {
        friends: {
          $filter: {
            input: "$friends",
            as: "friends",
            cond: {
              $eq: ["$$friends.isPending", true],
            },
          },
        },
        userId: 1,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "sender",
      },
    },
    {
      $project: {
        "sender.username": 1,
        "sender._id": 1,
        friends: 1,
        _id: 0,
      },
    },
    {
      $unwind: "$sender",
    },
    {
      $project: {
        relationships: {
          $reduce: {
            input: "$friends",
            initialValue: [],
            in: {
              $concatArrays: [
                "$$value",
                [
                  {
                    isPending: "$$this.isPending",
                    receiverUserId: "$$this.userId",
                    sender: "$sender",
                  },
                ],
              ],
            },
          },
        },
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "relationships.receiverUserId",
        foreignField: "_id",
        as: "receiver",
      },
    },
    {
      $project: {
        relationships: 1,
        "receiver.username": 1,
        "receiver._id": 1,
      },
    },
    {
      $project: {
        "relationships.receiverUserId": 0,
      },
    },
  ]).exec()

  const mappedOwnRelationships = ownRelationships[0].relationships.map(
    (relationship, index) => ({
      ...relationship,
      receiver: ownRelationships[0].receiver[index],
    })
  )

  return res.status(200).json({
    relationships: [...relationships, ...mappedOwnRelationships],
    success: true,
  })
}
