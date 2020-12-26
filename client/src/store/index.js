import { createStore } from "vuex"

import chatModule from "./modules/chat.store"
import authenticationModule from "./modules/authentication.store"
import userModule from "./modules/user.store"
import accountModule from "./modules/account.store"
import clockModule from "./modules/clock.store"
import imageModalModule from "./modules/imageModal.store"

// Create a new store instance.
const store = createStore({
  modules: {
    chat: chatModule,
    authentication: authenticationModule,
    user: userModule,
    account: accountModule,
    clock: clockModule,
    imageModal: imageModalModule,
  },
})

export default store

export const useStore = () => store
