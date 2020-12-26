const initialState = () => ({
  user: {
    token: null,
    username: '',
    _id: null
  }
})

export default {
  namespaced: true,
  state: initialState(),
  getters: {
    username: state => state.user.username,
    id: state => state.user._id
  },
  actions: {
    
  },
  mutations: {
    setUser: (state, user) => {
      state.user = user
    },
    resetUser: (state) => {
      state.user = {}
    }
  }
}