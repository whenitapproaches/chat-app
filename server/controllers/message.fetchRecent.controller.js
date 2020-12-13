const MessageModel = require("../models/message.model")

module.exports = async (req, res, next) => {
  const { offset } = req.query

  const { _id: userId } = req.user

  let limitation = 5

  let messages = await MessageModel.aggregate([
    {
      $match: {
        $or: [
          {
            senderId: userId,
          },
          {
            receiverId: userId,
          },
        ],
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $addFields: {
        partnerUserId: {
          $cond: {
            if: { $eq: ["$senderId", userId] },
            then: "$receiverId",
            else: "$senderId",
          },
        },
      },
    },
    {
      $group: {
        _id: "$partnerUserId",
        content: {
          $first: "$content",
        },
        messageId: {
          $first: "$_id",
        },
        createdAt: {
          $first: "$createdAt",
        },
      },
    },
    {
      $skip: +offset,
    },
    {
      $limit: limitation,
    },
    {
      $lookup: {
        from: "users",
        let: { partnerUserId: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$_id", "$$partnerUserId"],
              },
            },
          },
          {
            $project: {
              username: 1,
            },
          },
        ],
        as: "partner",
      },
    },
    {
      $unwind: {
        path: "$partner",
      },
    },
    {
      $lookup: {
        from: "profiles",
        let: { partnerUserId: "$partner._id" },
        pipeline: [
          {
            $match: {
              $expr: {
                $eq: ["$userId", "$$partnerUserId"],
              },
            },
          },
          {
            $project: {
              displayName: 1,
              _id: 1,
            },
          },
        ],
        as: "partner.profile",
      },
    },
    {
      $unwind: {
        path: "$partner.profile",
      },
    },
    {
      $project: {
        _id: "$messageId",
        partner: 1,
        content: 1,
        receiverId: 1,
        senderId: 1,
        createdAt: 1,
        profile: 1,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ]).exec()

  return res.status(200).json({
    success: true,
    messages,
  })
}
