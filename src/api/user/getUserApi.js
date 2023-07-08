import axios from '../http_axios'

export default {
  getUserList: () => {
    return axios.get('/users')
  },
  addUser: (data) => {
    return axios.post('/users', data)
  },
  getAllUserList: () => {
    return axios.get('http://localhost:9999/user/getAllUser')
  },
  login(data) {
    return axios.post('/auth/signin', data)
  }

}
