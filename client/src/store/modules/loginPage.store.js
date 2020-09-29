import { ref } from "vue"

export default () => {
  const isLoggingIn = ref(true)

  const updateIsLoggingIn = (status) => {
    isLoggingIn.value = status
  }

  return {
    isLoggingIn,
    updateIsLoggingIn
  }
}