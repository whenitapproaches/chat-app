import { useStore } from "@/store"
import { computed } from "vue"

export default (users) => {
  const store = useStore()

  const relationships = computed(() => store.state.account.relationships)

  const transformedUsers = computed(() => {
    return users.value.map((user) => {
      let username = user.username
      const relationship = relationships.value.find(
        (relationship) =>
          relationship.sender === username || relationship.receiver === username
      )
      if (!relationship)
        return {
          ...user,
          status: "none",
        }

      if (relationship.status === "friend") return { ...user, status: "friend" }

      return {
        ...user,
        status: relationship.sender === username ? "passive" : "active",
      }
    })
  })

  return transformedUsers
}
