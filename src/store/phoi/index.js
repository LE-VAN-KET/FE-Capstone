import PhoiApi from '../../api/phoi/PhoiApi'

export default {
  namespaced: true,
  state: {
    phois: [],
    total: 0
  },
  getters: {
    getPhois: (state) => state.phois,
    getTotal: (state) => state.total
  },
  mutations: {
    SET_PHOIS(state, data) {
      state.phois = [...data]
    },
    SET_TOTAL(state, data) {
      state.total = data
    }
  },
  actions: {
    async get_all_phois({ commit }, params) {
      const response = await PhoiApi.getListPhois(params)
      try {
        commit('SET_PHOIS', response.data)
        commit('SET_TOTAL', response.total)
      } catch (err) {
        this.loading = true
        console.log(err)
      }
    }
  }
}
