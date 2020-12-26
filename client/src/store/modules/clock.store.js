import moment from "moment"

const initialState = () => ({
  nowEveryMinute: moment(),
})

export default {
  namespaced: true,
  state: initialState(),
  getters: {},
  actions: {
    updateNowEveryMinute: ({ commit, dispatch }) => {
      commit("updateNowEveryMinute")
      setTimeout(() => dispatch("updateNowEveryMinute"), 60000)
    },
  },
  mutations: {
    updateNowEveryMinute: (state) => (state.nowEveryMinute = moment()),
  },
}
