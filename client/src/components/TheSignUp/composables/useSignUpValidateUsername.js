import { watchEffect } from "vue"
import { useStore } from "@/store"

export default (username, error) => {
  const userStore = useStore("User")

  function validateUsernameLength(username) {
    if (username.length < 10) {
      error.username = "Username length must be more than 10 characters"
      return true
    }
  }

  let checkUsernameAvailabilityTokenSource

  async function validateUsernameAvailability(username) {
    const { request, source } = userStore.checkUsernameAvailability(username)
    checkUsernameAvailabilityTokenSource = source
    const response = await request()
    const isAvailable = response.data
    if (!isAvailable) {
      error.username = "This username has already been taken"
      return
    }
    error.username = ""
  }

  function validateUsername(username) {
    return setTimeout(() => {
      if (validateUsernameLength(username)) return
      validateUsernameAvailability(username)
    }, 500)
  }

  watchEffect((onInvalidate) => {
    if (!username.value) return
    const timeout = validateUsername(username.value)
    onInvalidate(() => {
      if (checkUsernameAvailabilityTokenSource)
        checkUsernameAvailabilityTokenSource.cancel()
      clearTimeout(timeout)
    })
  })
}
