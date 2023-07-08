import axios from '../http_axios'

export default {
  getCatalogsList: (params) => {
    return axios({
      method: 'get',
      url: '/graduation-catalog',
      params: {
        ...params
      }
    })
  },
  addCatalog: (data) => {
    return axios({
      method: 'post',
      url: '/graduation-catalog',
      data: {
        ...data
      }
    })
  },
  updateCatalog: (data, id) => {
    return axios({
      method: 'put',
      url: `/graduation-catalog/${id}`,
      data: {
        ...data
      }
    })
  },
  getGoodsListByPage: () => {
    return axios({
      method: 'get',
      url: '/good_listbyPage',
      params: {

      }
    })
  },
  getCatalogsByID: (id) => {
    return axios({
      method: 'get',
      url: `/graduation-catalog/${id}`,
      data: {
      }
    })
  },
  deleteCatalogs: (id) => {
    return axios({
      method: 'delete',
      url: `/graduation-catalog/${id}`,
      data: {
      }
    })
  }
}
