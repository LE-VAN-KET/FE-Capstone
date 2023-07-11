import axios from 'axios'

switch (process.env.NODE_ENV) {
  case 'production':
    axios.defaults.baseURL = 'http://34.124.130.151:8000/api/v1'
    break
  case 'test':
    axios.defaults.baseURL = 'http://34.124.130.151:8000/api/v1'
    break
  default:
    axios.defaults.baseURL = 'http://34.124.130.151:8000/api/v1'
}

axios.defaults.timeout = 1000
axios.defaults.withCredentials = true

// axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.transformRequest = data => qs.stringify(data)

axios.interceptors.request.use(
  config => {
    // 携带上token
    const token = localStorage.getItem('token')
    token && (config.headers.Authorization = token)
    // 在每次请求获取数据之前都开启loading弹窗
    // loadings = Loading.service()
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

axios.defaults.validateStatus = status => {
  // 自定义响应成功的HTTP状态码
  return /^(2|3)\d{2}$/.test(status)
}

axios.interceptors.response.use(
  response => {
    // loadings.close()
    return response.data
  },
  error => {
    // loadings.close()
    const { response } = error
    if (response) {
      // 服务器返回了，最起码有结果
      switch (response.status) {
        case 400:
        case 404:
          return response.data
        case 401:
          // 当前请求需要用户验证（一般是未登录）
          // 下次有时间查资料整理此处跳转登录页面
          break
        case 403:
          // 服务器已经理解请求，但是拒绝执行它（一般是token过期）
          // 有时间补充资料来跳转登录界面
          localStorage.removeItem('token')
          break
        case 500:
          break
      }
    } else {
      if (!window.navigator.onLine) {
        return
      }
      return Promise.reject(error)
    }
  }
)
export default axios
