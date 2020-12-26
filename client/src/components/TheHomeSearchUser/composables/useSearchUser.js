import { watchEffect, computed, ref } from "vue"
import { AccountService } from "@/services/api.service"

export default () => {
  const username = ref("")

  const users = ref([])

  const isSearching = ref(false)

  let requestTokenSource

  async function searchByUsername(username) {
    const { request, source } = AccountService.searchByUsername(username)
    requestTokenSource = source
    const response = await request()
    const data = response.data
    users.value = data.users
    isSearching.value = false
  }

  function createSearchByUsernameTimer(username) {
    isSearching.value = true
    return setTimeout(() => {
      searchByUsername(username)
    }, 500)
  }

  watchEffect((onInvalidate) => {
    if (!username.value) {
      isSearching.value = false
      return (users.value = [])
    }
    const timeout = createSearchByUsernameTimer(username.value)
    onInvalidate(() => {
      if (requestTokenSource) requestTokenSource.cancel()
      isSearching.value = false
      clearTimeout(timeout)
    })
  })

  return { username, users, isSearching }
}
