const relationshipEvent = require("../../../helpers/relationship.event")
const { emitToUser } = require("../socketIdsManager")

module.exports = (io) => {
  relationshipEvent.on("added-friend", ({ sender, receiver }) => {
    emitToUser({
      user: receiver,
      io,
      data: {
        partner: sender,
      },
      eventName: "added-friend",
    })
  })
  relationshipEvent.on("removed-friend", ({ sender, receiver }) => {
    emitToUser({
      user: receiver,
      io,
      data: {
        partner: sender,
      },
      eventName: "removed-friend",
    })
  })
  relationshipEvent.on("accepted-friend-request", ({ sender, receiver }) => {
    emitToUser({
      user: receiver,
      io,
      data: {
        partner: sender,
      },
      eventName: "accepted-friend-request",
    })
  })
  relationshipEvent.on("canceled-friend-request", ({ sender, receiver }) => {
    emitToUser({
      user: receiver,
      io,
      data: {
        partner: sender,
      },
      eventName: "canceled-friend-request",
    })
  })
}
