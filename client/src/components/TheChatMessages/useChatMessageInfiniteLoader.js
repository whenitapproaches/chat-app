import { useStore } from "@/store"
import { computed } from "vue"

export default (root, loadingElement) => {
  let options = {
    root: root.value,
    rootMargin: "0px",
    threshold: 0,
  }

  const store = useStore()
  const partnerConversation = computed(
    () => store.getters["chat/currentPartnerConversation"]
  )
  const currentPartnerUsername = computed(
    () => store.getters["chat/currentPartnerUsername"]
  )
  const fetchNewMessages = (username, offset) => {
    return store.dispatch("chat/fetchNewMessages", { username })
  }

  let callback = (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        const conversation = partnerConversation.value
        const partnerUsername = currentPartnerUsername.value
        if (!conversation) return
        if (conversation.isFetchingNewMessages || conversation.isFullLoaded)
          return
        store.dispatch("chat/updateIsFetchingNewMessages", {
          status: true,
          username: partnerUsername,
        })
        await fetchNewMessages(partnerUsername)
        store.dispatch("chat/updateIsFetchingNewMessages", {
          status: false,
          username: partnerUsername,
        })
      }
    })
  }

  let observer = new IntersectionObserver(callback, options)

  observer.observe(loadingElement.value.$el)
}
