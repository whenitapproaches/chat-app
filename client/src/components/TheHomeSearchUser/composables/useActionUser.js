import { useStore } from "@/store"

export default () => {
  const store = useStore()

  const removeFriend = (receiver) => {
    store.dispatch("account/removeFriend", receiver)
  }

  const addFriend = (receiver) => {
    store.dispatch("account/addFriend", receiver)
  }
  const respondFriend = ({ receiver, status }) => {
    console.log(receiver)
    store.dispatch("account/respondFriend", { receiver, status })
  }

  return { removeFriend, addFriend, respondFriend }
}
