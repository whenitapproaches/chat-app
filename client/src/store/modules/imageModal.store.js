const initialState = () => ({
  isModalOpened: false,
  imageSrc: null
})

export default {
  namespaced: true,
  state: initialState(),
  getters: {},
  actions: {
    closeImageModal: ({ commit }) => {
      commit("updateIsModalOpened", false)
    },
    openImageModal: ({ commit }, media) => {
      commit("updateIsModalOpened", true)
      commit("updateImageSrc", media)
    },
  },
  mutations: {
    updateIsModalOpened: (state, status) => {
      state.isModalOpened = status
    },
    updateImageSrc: (state, media) => {
      state.imageSrc = media
    }
  },
}
