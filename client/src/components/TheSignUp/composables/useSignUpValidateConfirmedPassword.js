import { watchEffect } from "vue"

export default (confirmedPassword, password, error) => {
  function validateConfirmedPasswordLength(confirmedPassword) {
    if (confirmedPassword.length < 6) {
      error.confirmedPassword =
        "Your password length must be more than 6 characters"
      return true
    }
  }

  function validateConfirmedPasswordMatch(confirmedPassword, password) {
    if (confirmedPassword !== password) {
      error.confirmedPassword =
        "Confirmed password must be matched with your password"
      return true
    }
    error.confirmedPassword = ""
  }

  function validateConfirmedPassword(confirmedPassword, password) {
    return setTimeout(() => {
      if (validateConfirmedPasswordLength(confirmedPassword)) return
      validateConfirmedPasswordMatch(confirmedPassword, password)
    }, 500)
  }

  watchEffect((onInvalidate) => {
    if (!confirmedPassword.value) return
    const timeout = validateConfirmedPassword(
      confirmedPassword.value,
      password.value
    )
    onInvalidate(() => {
      clearTimeout(timeout)
    })
  })
}
