import SocketService from "@/services/socket.service"
import { useStore } from "@/store"

export default function userRelationshipsListener() {
  const store = useStore()

  SocketService.getSocket().off("added-friend")
  SocketService.getSocket().on("added-friend", ({ partner }) => {
    console.log("added-friend")
    store.dispatch("account/createRelationship", partner)
  })
  SocketService.getSocket().off("removed-friend")
  SocketService.getSocket().on("removed-friend", ({ partner }) => {
    store.dispatch("account/removeRelationship", partner)
  })
  SocketService.getSocket().off("accepted-friend-request")
  SocketService.getSocket().on("accepted-friend-request", ({ partner }) => {
    store.dispatch("account/updateRelationship", { partner, status: "friend" })
  })
  SocketService.getSocket().off("canceled-friend-request")
  SocketService.getSocket().on("canceled-friend-request", ({ partner }) => {
    store.dispatch("account/removeRelationship", partner)
  })
}
