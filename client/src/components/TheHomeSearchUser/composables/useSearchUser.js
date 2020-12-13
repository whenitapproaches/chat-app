import { watchEffect } from "vue"
import { AccountService } from "@/services/api.service"

export default (username, users) => {
  let requestTokenSource

  async function searchByUsername(username) {
    const { request, source } = AccountService.searchByUsername(username)
    requestTokenSource = source
    const response = await request()
    const data = response.data
    users.value = data.users
  }

  function createSearchByUsernameTimer(username) {
    return setTimeout(() => {
      searchByUsername(username)
    }, 500)
  }

  watchEffect((onInvalidate) => {
    if (!username.value) return
    const timeout = createSearchByUsernameTimer(username.value)
    onInvalidate(() => {
      if (requestTokenSource) requestTokenSource.cancel()
      clearTimeout(timeout)
    })
  })
}
