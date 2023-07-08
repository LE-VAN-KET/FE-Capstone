import axios from '../http_axios'

export default {
  addPhoi: (data) => {
    return axios({
      method: 'post',
      url: '/phoi',
      data
    })
  },
  getListPhois: (params) => {
    return axios({
      method: 'get',
      url: '/phoi',
      params: {
        ...params
      }
    })
  },
  updatePhoi: (id, data) => {
    return axios({
      method: 'put',
      url: `/phoi/${id}`,
      data
    })
  },
  revokePhoi: (id) => {
    return axios({
      method: 'delete',
      url: `/phoi/${id}`
    })
  }
}
