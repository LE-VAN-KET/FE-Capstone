import axios from '../http_axios'

export default {
  addListDiplomas: (data) => {
    return axios({
      method: 'post',
      url: '/diploma/upload-diplomas',
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  getListDiplomas: (params) => {
    return axios({
      method: 'get',
      url: '/diploma',
      params: {
        ...params
      }
    })
  },
  changeStatusDiploma: (data, refNo) => {
    return axios({
      method: 'patch',
      url: `/diploma/${refNo}`,
      data
    })
  },
  updateDiploma: (data, id) => {
    return axios({
      method: 'put',
      url: `/diploma/${id}`,
      data,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },
  verifyDiploma: (ids) => {
    return axios({
      method: 'put',
      url: '/diploma/verified',
      data: ids
    })
  },
  getListyear: () => {
    return axios({
      method: 'get',
      url: '/diploma/years'
    })
  },
  search: (data) => {
    return axios({
      method: 'post',
      url: '/diploma/search',
      data
    })
  }
}
