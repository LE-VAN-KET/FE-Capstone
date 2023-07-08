import CatalogApi from '../../api/catalog/catalogApi'

export default {
  namespaced: true,
  state: {
    catalogs: [],
    total: 0
  },
  getters: {
    getCatalogs: (state) => state.catalogs,
    getTotal: (state) => state.total
  },
  mutations: {
    SET_CATALOGS(state, data) {
      state.catalogs = [...data]
    },
    SET_TOTAL(state, data) {
      state.total = data
    }
  },
  actions: {
    async get_all_catalogs({ commit }, params) {
      const response = await CatalogApi.getCatalogsList(params)
      try {
        commit('SET_CATALOGS', response.data)
        commit('SET_TOTAL', response.total)
      } catch (err) {
        this.loading = true
        console.log(err)
      }
    }
  }
}
