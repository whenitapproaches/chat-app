import { watchEffect } from "vue"

export default (password, error) => {
  function validatePasswordLength(password) {
    if (password.length < 6) {
      error.password = "Your password length must be more than 6 characters"
      return true
    }
    error.password = ""
  }

  function validatePassword(password) {
    return setTimeout(() => {
      if (validatePasswordLength(password)) return
    }, 500)
  }

  watchEffect((onInvalidate) => {
    if (!password.value) return
    const timeout = validatePassword(password.value)
    onInvalidate(() => {
      clearTimeout(timeout)
    })
  })
}
